import { getAllDocs } from "../../src/helpers/docs";
import { DocType, DocTypeEnum } from "../../src/helpers/docs/types";
import Head from "next/head";
import DocListItemPreview from "../../components/docs/docListItemPreview";
import SearchDocs from "../../components/search/SearchDocs";

export default function BlogHome() {
  const allDocs = getAllDocs({
    docEnum: DocTypeEnum.Blog,
  });

  return (
    <div className="">
      <Head>
        <title>Thoughts: Jett Hays</title>
        <meta
          name="description"
          content="Thoughts on technology and philosophy."
        />
      </Head>
      <div className="max-w-3xl mx-auto">
        <div className="dark:text-white">
          <div className=" mb-[5vh] text-left">
            <p className="text-sky-400 text-lg font-semibold">Blog</p>
            <p className="text-gray-500">From my mind to yours.</p>
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
