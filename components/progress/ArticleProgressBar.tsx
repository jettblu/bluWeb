"use client";

import { useCallback, useEffect, useState } from "react";

export default function ArticleProgress({
  target,
}: {
  target: React.RefObject<HTMLDivElement | null>;
}) {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = useCallback(() => {
    const el = target.current;
    if (!el) return;

    const scrollY = window.scrollY;
    const rect = el.getBoundingClientRect();
    const articleTop = scrollY + rect.top;
    const articleHeight = el.offsetHeight;
    if (articleHeight <= 0) return;

    const winH = window.innerHeight;
    // 0% until the user scrolls down to/past the article start (not "how much of the article is in view")
    const scrolledPastTop = Math.max(0, scrollY - articleTop);
    const scrollable = articleHeight - winH;

    let raw: number;
    if (scrollable <= 0) {
      raw =
        scrolledPastTop <= 0
          ? 0
          : Math.min(100, (scrolledPastTop / Math.max(articleHeight, 1)) * 100);
    } else {
      raw = (scrolledPastTop / scrollable) * 100;
    }

    setReadingProgress(Math.min(100, Math.max(0, raw)));
  }, [target]);

  useEffect(() => {
    scrollListener();
    window.addEventListener("scroll", scrollListener, { passive: true });
    window.addEventListener("resize", scrollListener, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [scrollListener]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-20 z-[45] h-1.5 w-full bg-slate-200/80 dark:bg-slate-700/50"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 opacity-90 transition-[width] duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
}
