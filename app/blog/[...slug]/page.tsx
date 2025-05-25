import DocContent from "../../../components/docs/docContent";
import DocHeader from "../../../components/docs/docHeader";
import DocKeepReadingPreview from "../../../components/docs/docKeepReadingPreview";

import { getDocBySlug, getDocsByCategory } from "../../../src/helpers/docs";
import { DocType, DocTypeEnum } from "../../../src/helpers/docs/types";

import Custom404 from "../../404";
import type { Metadata, ResolvingMetadata } from "next";
import BluVideo from "../../../components/film/bluVideo";

import markdownToHtml from "../../../src/helpers/docs/markdownFormat";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  // read route params
  const slug = params.slug[0];
  const doc = getDocBySlug({ slug: slug, docEnum: DocTypeEnum.Blog });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const newOgImages = doc.image
    ? [doc.image, ...previousImages]
    : previousImages;

  return {
    title: doc.title,
    openGraph: {
      images: newOgImages,
      title: doc.title,
      description: doc.oneLiner,
    },
    twitter: {
      images: newOgImages,
      title: doc.title,
      description: doc.oneLiner,
    },
    description: doc.oneLiner,
  };
}

export default async function Post(context: any) {
  const slug = (await context.params).slug[0];
  const doc = getDocBySlug({ slug: slug, docEnum: DocTypeEnum.Blog });
  doc.content = await markdownToHtml(doc.content);
  const recommendedDocs: DocType[] = getDocsByCategory({
    category: doc.category,
    slugToExclude: doc.slug,
    docEnum: DocTypeEnum.Blog,
    maxCount: 3,
  });

  // TODO: 2x check to make sure we correctly set 404
  if (!doc?.slug) {
    console.warn(`Unable to find this doc!`);
    return <Custom404 />;
  }
  const readNext: DocType[] = recommendedDocs ? recommendedDocs : [];
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div>
          <DocHeader
            title={doc.title}
            image={doc.image || undefined}
            hideIcon={true}
            lastUpdated={doc.lastUpdate}
            emoji={doc.emoji || undefined}
          />
          {doc.videoSrc && (
            <div className="mb-10">
              <BluVideo videoSrc={doc.videoSrc} isPlaying={false} />
            </div>
          )}
          <DocContent>
            <div dangerouslySetInnerHTML={{ __html: doc.content }} />
          </DocContent>

          {readNext.length != 0 && (
            <div className="my-8">
              <hr className="mt-2" />
              <div className="mt-6 mb-8">
                <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600 text-left">
                  Keep Reading
                </h1>
                <p className="text-md text-gray-700 dark:text-gray-200">
                  Explore more ideas on the intersection of philosophy and
                  performance.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                {readNext.map((doc: DocType, index: number) => (
                  <DocKeepReadingPreview
                    baseUrl="/blog/"
                    key={`keep reading preview ${index}`}
                    title={doc.title}
                    image={doc.image || undefined}
                    emoji={doc.emoji || undefined}
                    oneLiner={doc.oneLiner}
                    slug={doc.slug}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[24vh]">
        {/* padding div for space between top and main elements */}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const docs = getDocsByCategory({
    category: "blog",
    docEnum: DocTypeEnum.Blog,
  });
  return docs.map((doc) => {
    return {
      params: {
        slug: [doc.slug],
      },
    };
  });
}
