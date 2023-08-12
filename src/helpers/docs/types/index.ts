export type DocType = {
  slug: string;
  title: string;
  lastUpdate: string;
  image: string | null;
  emoji: string | null;
  videoSrc: string | null;
  videoTitle: string | null;
  oneLiner: string;
  content: string;
  category: string;
  tags: string[] | null;
  // author props
  contributor: Contributor;
};

export const DEFAULT_CONTRIBUTOR: Contributor = {
  id: "",
  name: "",
  role: "",
  avatarPath: "",
};

export const DEFAULT_DOC: DocType = {
  slug: "",
  title: "",
  lastUpdate: "",
  image: null,
  emoji: null,
  videoSrc: null,
  videoTitle: null,
  oneLiner: "",
  content: "",
  category: "",
  tags: null,
  contributor: DEFAULT_CONTRIBUTOR,
};

export enum DocTypeEnum {
  Blog = 0,
  DevDoc = 1,
  UserDoc = 2,
}

export type Contributor = {
  id: string;
  name: string;
  role: string;
  avatarPath: string;
};

export enum ContributorRole {
  Builder = 0,
  Writer = 1,
}
