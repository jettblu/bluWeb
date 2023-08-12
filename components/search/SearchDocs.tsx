"use client";

import { useState, useEffect } from "react";
import { DocType } from "../../src/helpers/docs/types";
import DocListItemPreview from "../docs/docListItemPreview";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchDocs(props: { allDocs: DocType[] }) {
  const { allDocs } = props;
  const [showAll, setShowAll] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredDocs, setFilteredDocs] = useState<DocType[]>(allDocs);

  function searchArticles(q: string): DocType[] {
    // filter on title and tags
    const newResults: DocType[] = allDocs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.tags?.find((d) => d.toLowerCase().includes(q))
    );
    return newResults;
  }

  function handleQueryChange(newQuery: string) {
    // get suggestions
    const searchResults = searchArticles(newQuery);
    // update state
    setQuery(newQuery);
    setFilteredDocs(searchResults);
  }

  const articleContainerId = "articleResultsContainer";

  useEffect(() => {
    const articleContainer = document.getElementById(articleContainerId);
    if (!articleContainer) {
      return;
    }
    const initHeight = articleContainer.scrollHeight;
    articleContainer.style.minHeight = `${initHeight}px`;
  }, []);

  return (
    <div>
      {/* searchbar */}
      <div className="my-10 rounded-lg bg-gray-100 dark:bg-gray-900 border border-slate-200 hover:border-green-400 text-black dark-text-gray">
        <div className="flex flex-row space-x-1">
          <div className="my-auto font-semibold pl-2">
            <AiOutlineSearch size={24} className="text-black dark:text-white" />
          </div>

          <input
            type="search"
            autoComplete="off"
            id="search-articles"
            className="p-4 flex-grow text-gray-900 text-lg bg-inherit dark:placeholder-gray-400 dark:text-white font-bold outline-none"
            placeholder={`Search Articles`}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-2" onClick={() => setShowAll(!showAll)}>
        {showAll ? (
          <p className="text-sky-400 text-right text-lg mt-4 font-semibold hover:cursor-pointer">
            Hide All
          </p>
        ) : (
          <p className="text-sky-400 text-right text-lg mt-4 font-semibold hover:cursor-pointer">
            See All
          </p>
        )}
      </div>
      <div id={articleContainerId}>
        {showAll && (
          <div className="grid grid-cols-1 gap-y-2">
            {filteredDocs.length != 0 ? (
              filteredDocs.map((doc: DocType, index: number) => (
                <DocListItemPreview doc={doc} key={index} />
              ))
            ) : (
              <p className="text-black dark:text-white">
                No results for{" "}
                <span className="text-blue-400 truncate ...">"{query}"</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
