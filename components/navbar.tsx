"use client";

import Link from "next/link";
import { useState } from "react";

function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isMenuMobile, setMenuMobile] = useState(false);

  const menuWrapperClassName = isMenuMobile
    ? "z-20 mt-8 flex h-[80vh] flex-col rounded-lg bg-gray-700 py-4 pl-8 pt-4 ring-4 ring-sky-400 backdrop-blur-2xl md:ml-auto md:mt-0 md:flex-row"
    : "hidden md:ml-auto md:mt-0 md:flex md:flex-row";

  return (
    <nav className="bluFont">
      {isMenuMobile && (
        <div className="absolute left-0 top-0 z-40 h-[100vh] w-full bg-sky-500/10 backdrop-blur-xl" />
      )}

      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-50 mx-auto flex h-20 max-w-full flex-col px-4 py-2 backdrop-blur-lg md:flex-row md:items-center md:backdrop-blur-xl",
          !isMenuMobile && "bg-[#F8F6F1]/50",
          isMenuMobile && "bg-[#F8F6F1]",
        )}
      >
        <div className="flex items-center justify-between hover:cursor-pointer">
          <div onClick={() => setMenuMobile(false)}>
            <Link href="/">
              <img src="/icon.ico" className="h-auto w-20" alt="Home" />
            </Link>
          </div>
          <button
            id="nav-icon"
            onClick={() => setMenuMobile(!isMenuMobile)}
            type="button"
            className={cn(
              "ml-3 inline-flex items-center rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden",
              isMenuMobile && "open",
            )}
            aria-controls="mobile-menu"
            aria-expanded={isMenuMobile}
          >
            <span className="bg-gray-500" />
            <span className="bg-gray-500" />
            <span className="bg-gray-500" />
          </button>
        </div>
        <div
          id="menu"
          className={menuWrapperClassName}
          onClick={() => setMenuMobile(false)}
        >
          <Link href="/research">
            <span className="p-2 text-6xl text-gray-400 transition-colors duration-300 hover:cursor-pointer hover:text-green-400 md:mx-2 md:text-4xl lg:px-4">
              Research
            </span>
          </Link>
          <Link href="/film">
            <span className="p-2 text-6xl text-gray-400 transition-colors duration-300 hover:cursor-pointer hover:text-green-400 md:mx-2 md:text-4xl lg:px-4">
              Film
            </span>
          </Link>
          <Link href="/blog">
            <span className="p-2 text-6xl text-sky-400 transition-colors duration-300 hover:cursor-pointer hover:text-pink-400 md:mx-2 md:text-4xl lg:px-4">
              Thoughts
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
