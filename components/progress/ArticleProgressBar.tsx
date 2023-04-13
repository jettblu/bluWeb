import { useEffect, useState } from "react";

export default function ArticleProgress({
  target,
}: {
  target: React.RefObject<HTMLDivElement>;
}) {
  const [readingProgress, setReadingProgress] = useState(0);
  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight = element.clientHeight - element.offsetTop;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return (
    <div
      className={`reading-progress-bar h-2 fixed top-0 left-0 z-50 opacity-80 bg-gradient-to-r from-cyan-500 to-sky-500`}
      style={{ width: `${readingProgress}%` }}
    />
  );
}
