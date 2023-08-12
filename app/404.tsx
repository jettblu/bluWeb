import type { NextPage } from "next";
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <div className={`mx-auto max-w-xl`}>
      <div className="min-h-[10rem]"></div>
      <div className="text-center">
        <p>
          <span className="text-5xl" title="404">
            404
          </span>
        </p>
        <p className="text-lg dark:text-slate-500 text-slate-400">
          Whoops! You're in unexplored territory.
        </p>
        <Link href="/">
          <p className="text-md dark:text-white hover:cursor-pointer dark:hover:text-sky-500 transition-colors duration-1500 mt-4">
            Keep exploring?
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
