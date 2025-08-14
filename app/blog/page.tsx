import { getAllDocs } from "../../src/helpers/docs";
import { DocTypeEnum } from "../../src/helpers/docs/types";

import SearchDocs from "../../components/search/SearchDocs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jett's Thoughts",

  description:
    "Jump down the neural rabbit hole with Jett Hays. Explore ideas on technology and philosophy.",
};
export async function BlogHome() {
  const allDocs = await getAllDocs({
    docEnum: DocTypeEnum.Blog,
  });

  return (
    <div className="">
      <div className="max-w-3xl mx-auto">
        <div className="dark:text-white">
          <div className=" mb-[5vh] text-left">
            <h1 className="text-3xl text-sky-400 font-semibold mb-2">Blog</h1>
            <p className="text-slate-700 dark:text-slate-200 text-xl">
              Thoughts on technology and philosophy.
            </p>
          </div>

          <SearchDocs allDocs={allDocs} />

          <div className="h-[6rem]">
            {/* padding div for space between bottom and main elements */}
          </div>
        </div>
      </div>
    </div>
  );
}
