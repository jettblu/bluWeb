import fs from "fs";
import { join } from "path";
/// <reference path="node_modules\gray-matter\gray-matter.d.ts" />
import matter from "gray-matter";
import { DEFAULT_DOC, DocType, DocTypeEnum } from "./types";
import { getContributorById } from "./contributors";
import { cache } from "react";

const blogDocsDirectory = join(process.cwd(), "blog");

const defaultFields = [
  "slug",
  "title",
  "lastUpdate",
  "image",
  "oneLiner",
  "content",
  "category",
  "emoji",
  "tags",
  "contributorId",
  "videoSrc",
  "videoTitle",
];

export function getDocSlugs(docEnum: DocTypeEnum) {
  let directory: string;
  switch (docEnum) {
    case DocTypeEnum.Blog: {
      directory = blogDocsDirectory;
      break;
    }
    default: {
      directory = blogDocsDirectory;
      break;
    }
  }
  return fs.readdirSync(directory);
}

// update if we can add more specific type
type Items = {
  [key: string]: any;
};

export function getDocBySlug(props: {
  slug: string;
  fields?: string[];
  docEnum: DocTypeEnum;
}): DocType {
  try {
    const { slug, fields, docEnum } = { ...props };
    // check if file is mdx or md
    const isMdx = slug.includes(".mdx");
    let realSlug = slug;
    if (isMdx) {
      realSlug = slug.replace(".mdx", "");
    } else {
      realSlug = slug.replace(".md", "");
    }
    let directory: string;
    switch (docEnum) {
      case DocTypeEnum.Blog: {
        directory = blogDocsDirectory;
        break;
      }
      default: {
        directory = blogDocsDirectory;
        break;
      }
    }
    let fullPath = "";
    if (isMdx) {
      fullPath = join(directory, `${realSlug}.mdx`);
    } else {
      fullPath = join(directory, `${realSlug}.md`);
    }
    let fileContents = "";
    // try to read file... if doesn't exist try other version of file
    let attempts = 0;
    while (attempts < 2) {
      try {
        if (attempts == 1 && isMdx) {
          // swtich to other version of file
          fullPath = join(directory, `${realSlug}.md`);
        } else if (attempts == 1 && !isMdx) {
          fullPath = join(directory, `${realSlug}.mdx`);
        }
        fileContents = fs.readFileSync(fullPath, "utf8");
        attempts = 2;
      } catch (e) {
        attempts++;
      }
    }
    const { data, content } = matter(fileContents);

    const items: Items = {};
    const fieldsToUse: string[] = fields || defaultFields;
    // Ensure only the minimal needed data is exposed
    fieldsToUse.forEach((field) => {
      if (field === "slug") {
        items[field] = realSlug;
      }
      if (field === "content") {
        items[field] = content;
      }

      if (typeof data[field] !== "undefined") {
        items[field] = data[field];
      }
    });
    const contributorId: string = items.contributorId || "";
    const contributor = getContributorById(contributorId);
    const docToReturn: DocType = {
      slug: items.slug || "",
      title: items.title || "",
      lastUpdate: items.lastUpdate || "",
      image: items.image || "",
      emoji: items.emoji || null,
      oneLiner: items.oneLiner || "",
      content: items.content || "",
      category: items.category || "",
      tags: items.tags || null,
      contributor: contributor,
      videoSrc: items.videoSrc || null,
      videoTitle: items.videoTitle || null,
    };
    return docToReturn;
  } catch (e) {
    console.log(e);
    return DEFAULT_DOC;
  }
}

export const getAllDocs = cache(function (props: {
  docEnum: DocTypeEnum;
  fields?: string[];
}): DocType[] {
  const { docEnum } = { ...props };

  const slugs = getDocSlugs(docEnum);
  const docs: DocType[] = slugs
    .map((slug) => getDocBySlug({ slug: slug, docEnum: docEnum }))
    // sort posts by date in descending order
    // TODO: check efficiency of date operation... maybe store on object?
    .sort((post1, post2) =>
      new Date(post1.lastUpdate).getTime() >
      new Date(post2.lastUpdate).getTime()
        ? -1
        : 1
    );
  return docs;
});

export function getDocsByCategory(props: {
  category: string;
  fields?: string[];
  docEnum: DocTypeEnum;
  slugToExclude?: string;
  maxCount?: number;
}): DocType[] {
  const { category, slugToExclude, fields, docEnum, maxCount } = { ...props };
  // TODO: examine efficiency if we call getalldocs this for every page
  const allDocs = getAllDocs({ docEnum: docEnum, fields: fields });
  let recommendedDocs = allDocs.filter(
    (d) =>
      d.category.toLowerCase().trim() == category.toLowerCase().trim() &&
      (!slugToExclude ||
        d.slug.toLowerCase().trim() != slugToExclude.toLowerCase().trim())
  );
  if (maxCount && recommendedDocs.length > maxCount) {
    recommendedDocs = recommendedDocs.slice(0, maxCount);
  }
  return recommendedDocs;
}
