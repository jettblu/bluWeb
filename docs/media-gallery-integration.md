# Media Gallery Integration Guide

This guide describes an incremental path for adding uploadable photo and video
galleries to bluWeb. It keeps the existing Markdown blog and static film pages
unchanged while introducing Supabase for gallery data and media storage.

## 1. Target architecture

```text
Private gallery admin (Next.js)
             |
             | authenticated metadata requests
             v
       Rust gallery API
             |
             +---- Supabase Postgres
             |
             +---- signed Storage uploads
             |
             +---- metadata and EXIF extraction

Public gallery (Next.js Server Components)
             |
             +---- published rows or public gallery view
             |
             +---- sanitized media derivatives
```

The responsibilities are deliberately separated:

- **Next.js** renders galleries and provides the private upload/editor UI.
- **Supabase Auth** identifies the gallery owner.
- **Supabase Postgres** stores collections, media metadata, captions, ordering,
  publication state, and optional location fields.
- **Supabase Storage** stores private originals and publishable derivatives.
- **Rust** validates uploads, extracts metadata, creates safe derivatives, and
  owns privileged database operations.

The blog can continue reading Markdown from `blog/`. A gallery item may
eventually be embedded in a blog post, but the first implementation should not
make blog rendering depend on the gallery service.

## 2. Define the first release

The initial release should support:

1. Sign in to a private gallery administration page.
2. Create and edit a named collection.
3. Upload JPEG, PNG, WebP, HEIC, and a limited set of web video formats.
4. Add a caption and occurrence date.
5. Extract location from photo EXIF when present.
6. Reorder items.
7. Preview and publish a collection.
8. Render a public, responsive photo/video gallery.

Defer maps, social feeds, reactions, multiple owners, and realtime updates.
Keeping publication explicit is important: uploading an asset must not make it
public automatically.

## 3. Create the Supabase project structure

Manage the database through committed migrations:

```text
supabase/
  config.toml
  migrations/
    <timestamp>_create_gallery.sql
    <timestamp>_gallery_rls.sql
    <timestamp>_gallery_storage.sql
```

Use two Storage buckets:

- `media-originals`: private, never linked from public pages.
- `media-public`: contains metadata-stripped, publishable derivatives.

Keeping originals private prevents accidental disclosure of embedded GPS,
camera, and author metadata. Do not make an original public merely because its
database row is published.

Recommended environment variables:

```text
# Next.js, safe to expose
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Next.js server and Rust only
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DATABASE_URL=
GALLERY_API_URL=

# Rust only
GALLERY_TOKEN_ENCRYPTION_KEY=
```

The service-role key and direct database URL must never enter a browser bundle.

## 4. Add the gallery schema

Start with two core tables rather than a generalized content system.

```sql
create type public.media_kind as enum ('image', 'video');
create type public.media_state as enum (
  'uploading',
  'processing',
  'draft',
  'published',
  'failed'
);

create table public.media_collections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  slug text not null unique,
  title text not null,
  description text,
  cover_item_id uuid,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_items (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null
    references public.media_collections(id) on delete cascade,
  owner_id uuid not null references auth.users(id),
  kind public.media_kind not null,
  state public.media_state not null default 'uploading',

  original_object_path text not null,
  public_object_path text,
  thumbnail_object_path text,
  mime_type text not null,
  width integer,
  height integer,
  duration_ms bigint,
  file_size_bytes bigint,
  blurhash text,

  caption text,
  alt_text text,
  occurred_at timestamptz,
  sort_order integer not null default 0,

  latitude double precision,
  longitude double precision,
  location_name text,
  location_source text,

  processing_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

After both tables exist, add the `cover_item_id` foreign key in a separate
statement. Add indexes for:

- `(collection_id, sort_order)`
- `(owner_id, state)`
- public collection lookup by `slug`

### Location fields

`latitude` and `longitude` are nullable because many files will not have EXIF
coordinates. `location_source` should distinguish values such as `exif`,
`manual`, and `none`.

Treat exact coordinates as private metadata even for a published item. Expose
`location_name`, or a coarsened coordinate, through the public query. A public
database view is a useful enforcement boundary:

```sql
create view public.published_media_items as
select
  i.id,
  i.collection_id,
  i.kind,
  i.public_object_path,
  i.thumbnail_object_path,
  i.width,
  i.height,
  i.duration_ms,
  i.blurhash,
  i.caption,
  i.alt_text,
  i.occurred_at,
  i.sort_order,
  i.location_name
from public.media_items i
join public.media_collections c on c.id = i.collection_id
where c.is_published = true
  and i.state = 'published';
```

Do not include original object paths or exact coordinates in this public view.

## 5. Configure authentication and RLS

Use Supabase Auth for the private administration area. Magic-link or passkey
authentication is sufficient for a single-owner site.

Enable RLS on both tables and implement these rules:

- Anonymous users can read only published collections and the public media
  view.
- An authenticated user can select, insert, update, and delete rows whose
  `owner_id = auth.uid()`.
- No browser role can write another user's `owner_id`.
- Original Storage objects are readable only by their owner.
- Public derivatives are readable by everyone but writable only by their
  owner or the Rust service.

Even for a single-user site, retain `owner_id`. It prevents accidental
cross-account access and avoids a schema migration if another contributor is
added later.

The Rust API must validate the user's Supabase JWT for admin operations.
Service-role access bypasses RLS, so every privileged mutation must also check
the authenticated owner explicitly.

## 6. Implement the upload lifecycle

Use a direct-to-Storage upload so large media files do not pass through Next.js
or the Rust API.

### Upload sequence

1. The admin asks Rust to initialize an upload with filename, MIME type, and
   collection ID.
2. Rust verifies ownership, creates a `media_items` row in `uploading` state,
   and returns a signed upload URL for a generated object path.
3. The browser uploads directly to `media-originals`.
4. The browser calls the finalize endpoint with the item ID.
5. Rust verifies that the object exists and matches the declared size/type.
6. Rust sets the item to `processing`.
7. Rust extracts dimensions, duration, capture time, and optional EXIF GPS.
8. Rust creates a metadata-stripped display asset and thumbnail.
9. Derivatives are written to `media-public` under generated paths.
10. Rust records the derivative metadata and changes the item to `draft`.
11. Publication changes the item to `published`; failures become `failed` with
    an owner-visible error.

Use generated UUID-based paths rather than user filenames:

```text
<owner-id>/<collection-id>/<item-id>/original
<owner-id>/<collection-id>/<item-id>/display.webp
<owner-id>/<collection-id>/<item-id>/thumbnail.webp
```

This avoids collisions and makes ownership checks straightforward.

### Processing rules

- Verify file signatures; do not trust only the browser MIME type.
- Set explicit maximum file and video duration limits.
- Correct image orientation before generating derivatives.
- Remove EXIF/IPTC/XMP metadata from public derivatives.
- Generate image dimensions and a BlurHash or tiny placeholder.
- Generate a poster image for videos.
- Reject unsupported codecs with a clear admin-facing message.
- Make finalization idempotent so retrying it is safe.

For the first release, synchronous processing is acceptable for ordinary
photos. Video processing should use a durable job row because it can exceed an
HTTP request timeout.

## 7. Add the Rust gallery service

A small `axum` service is sufficient:

```text
gallery-api/
  Cargo.toml
  src/
    main.rs
    auth.rs
    config.rs
    db/
    gallery/
      models.rs
      routes.rs
      service.rs
    media/
      metadata.rs
      image.rs
      video.rs
      storage.rs
    jobs/
```

Suggested endpoints:

```text
POST   /v1/uploads
POST   /v1/uploads/:item_id/finalize
GET    /v1/admin/collections
POST   /v1/admin/collections
PATCH  /v1/admin/collections/:id
PATCH  /v1/admin/items/:id
POST   /v1/admin/items/reorder
POST   /v1/admin/items/:id/publish
DELETE /v1/admin/items/:id
GET    /health
```

Use:

- `sqlx` for transactional Postgres operations.
- `supabase_storage_rs` or the Storage HTTP API for signed object operations.
- `kamadak-exif` for photo EXIF.
- `image` for image validation and derivatives.
- `ffprobe`/`ffmpeg` for video metadata, posters, and transcoding.
- `serde`, `uuid`, `chrono`, and `tracing` for contracts and operations.

Keep database rows authoritative. A storage event alone should not publish or
create gallery content.

## 8. Add shared API contracts

Do not duplicate loosely related TypeScript and Rust response shapes by hand.
Define Rust request/response structures and export an OpenAPI specification
with `utoipa`. Generate a small TypeScript client during development or CI.

Public rendering can still query Supabase directly. The generated client is
primarily for authenticated administration and uploads.

Suggested public TypeScript model:

```ts
type PublishedMediaItem = {
  id: string;
  kind: "image" | "video";
  publicObjectPath: string;
  thumbnailObjectPath: string | null;
  width: number | null;
  height: number | null;
  durationMs: number | null;
  blurhash: string | null;
  caption: string | null;
  altText: string | null;
  occurredAt: string | null;
  locationName: string | null;
};
```

## 9. Integrate the Next.js frontend

Add gallery features without rewriting the current media components:

```text
app/
  gallery/
    page.tsx
    [slug]/
      page.tsx
  admin/
    gallery/
      page.tsx
      [collectionId]/
        page.tsx

components/
  gallery/
    GalleryGrid.tsx
    GalleryItem.tsx
    GalleryLightbox.tsx
    GalleryVideo.tsx
    UploadDropzone.tsx
    CollectionEditor.tsx

src/
  gallery/
    types.ts
    queries.ts
    storage.ts
```

Reuse visual behavior from:

- `app/adventures/summer23/page.tsx` for narrative, full-screen galleries.
- `components/images/ImageWithBlur.tsx` for image placeholders.
- `components/film/bluVideo.tsx` for existing video presentation.
- `src/helpers/BluFetch/index.ts` for authenticated API calls, after adding an
  explicit Rust API base URL.

Prefer Server Components for the initial public collection query. Add client
components only for interactions such as a lightbox, playback, uploads, and
reordering.

Use Next.js cache tags or timed revalidation for public galleries. Revalidate
the affected collection after publication. Supabase Realtime is unnecessary
for the first release.

## 10. Handle deletion and replacement safely

Deletion spans Postgres and Storage and therefore is not a single transaction.
Use this sequence:

1. Mark the item as pending deletion or remove it from publication.
2. Delete public derivatives.
3. Delete the private original.
4. Delete the database row.
5. Periodically reconcile orphaned objects and rows.

Never reuse an object path when replacing media. Upload a new item, switch the
reference, and then retire the old item. This prevents CDN and browser caches
from serving stale content.

## 11. Test the integration

### Database and security

- Anonymous users cannot read drafts or original paths.
- An authenticated owner can manage only their own rows.
- Public views never expose exact coordinates.
- Storage policies match table ownership behavior.

### Upload and processing

- Valid image with and without EXIF GPS.
- Rotated phone photo.
- Image with malformed EXIF.
- Oversized image.
- Supported and unsupported video codecs.
- Interrupted direct upload and repeated finalization.
- Processing failure and retry.

### Frontend

- Empty collection and mixed photo/video collection.
- Responsive image sizing and cumulative layout shift.
- Keyboard-accessible lightbox.
- Video poster and playback behavior.
- Draft preview versus public rendering.
- Missing captions, dates, and locations.

Run the existing lint and production build as part of each frontend increment.
Add Rust unit tests for metadata normalization and integration tests against a
local Supabase instance.

## 12. Roll out incrementally

### Milestone 1: read-only gallery

- Create schema, public view, and RLS.
- Seed one collection manually.
- Build `/gallery` and `/gallery/[slug]`.
- Confirm responsive image and video rendering.

### Milestone 2: photo upload and publishing

- Add Auth and the private admin route.
- Add signed upload initialization and finalization.
- Extract image metadata and location.
- Generate sanitized image derivatives and thumbnails.
- Add ordering and explicit publication.

### Milestone 3: video support

- Add durable processing jobs.
- Generate video posters and normalized playback formats.
- Add retry and failure states.

### Milestone 4: operational hardening

- Add orphan reconciliation.
- Add database backups and Storage lifecycle rules.
- Add request tracing, job metrics, and processing alerts.
- Document file limits and recovery procedures.

## Completion criteria

The integration is complete when:

- A gallery can be created without editing source files.
- Photos and videos upload directly to private Storage.
- Public derivatives contain no original metadata.
- Optional EXIF location is stored privately and absence is handled normally.
- Draft content and original paths are inaccessible anonymously.
- Publishing makes a collection visible through a stable slug.
- Public pages remain usable when the Rust service is temporarily unavailable.
- Upload finalization and processing can be retried without duplicate items.
