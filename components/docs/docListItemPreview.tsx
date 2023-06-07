import Link from "next/link";
import { DocType } from "../../src/helpers/docs/types";

type Props = {
  doc: DocType;
};

const DocListItemPreview = ({ doc }: Props) => {
  const { slug, title, lastUpdate } = { ...doc };
  const urlBase = "/blog/[slug]";
  const urlAs = `/blog/${slug}`;
  const formattedDate = new Date(lastUpdate.replace(/-/g, "/")).toDateString();
  const listItemId = `${title}ListPreview`;
  const listItemTitleId = `${title}Title`;

  return (
    <Link as={urlAs} href={urlBase}>
      <div
        id={listItemId}
        className="rounded-md px-2 py-4 hover:cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-900 text-slate-700 dark:text-slate-200"
      >
        <div className="flex flex-row space-x-2">
          <h1
            id={listItemTitleId}
            className="text-xl font-semibold hover:text-sky-400 hover:underline"
          >
            {title}
          </h1>
          <div className="flex-grow text-right">
            <p className="mt-1 text-sm my-auto text-slate-500 dark:text-slate-400">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DocListItemPreview;
