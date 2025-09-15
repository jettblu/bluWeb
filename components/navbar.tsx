"use client";

import { NextPage } from "next";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

const Navbar: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  const [isMenuMobile, setMenuMobile] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // if the theme is not yet mounted, don't render anything
  // this prevents the navbar from rendering server-side
  // which would cause a hydration mismatch
  if (!mounted) {
    return null;
  }

  // change style based on boolean
  const menuWrapperClassName = isMenuMobile
    ? "flex flex-col md:flex-row mx-auto h-[80vh] rounded-lg bg-gray-700 ring-4 ring-sky-400 md:ml-auto mt-8 md:mt-0 pt-4 z-20 pl-8 backdrop-blur-2xl"
    : "hidden md:flex md:flex-row md:ml-auto md:mt-0";

  return (
    <nav className="bluFont">
      {isMenuMobile && (
        <div
          className={`absolute top-0 left-0 bg-sky-500/10 backdrop-blur-xl w-full h-[100vh] z-40`}
        ></div>
      )}

      <div
        className={`-mx-4 md:flex md:items-center fixed h-20 py-2 z-50 w-full px-4 backdrop-blur-lg md:backdrop-blur-xl bg-secondary`}
      >
        <div className="flex justify-between items-center hover:cursor-pointer">
          <div onClick={() => setMenuMobile(false)}>
            {
              <Link href="/">
                <Image
                  src="/icon.ico"
                  width={20}
                  height={20}
                  className="w-20 h-auto"
                  alt="Clouding floating on a delicate atmosphere of pixels."
                />
              </Link>
            }
          </div>
          <button
            id="nav-icon"
            onClick={() => setMenuMobile(!isMenuMobile)}
            type="button"
            className={`md:hidden inline-flex ${
              isMenuMobile && "open"
            } items-center ml-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="bg-gray-500 dark:bg-gray-400"></span>
            <span className="bg-gray-500 dark:bg-gray-400"></span>
            <span className="bg-gray-500 dark:bg-gray-400"></span>
          </button>
        </div>
        <div
          id="menu"
          className={menuWrapperClassName}
          onClick={() => setMenuMobile(false)}
        >
          <Link href="/research">
            <span
              className={`p-2 lg:px-4 md:mx-2 text-gray-400 text-6xl md:text-4xl hover:cursor-pointer hover:text-green-400 dark:hover:text-green-300 transition-colors duration-300 `}
            >
              Research
            </span>
          </Link>
          <Link href="/film">
            <span
              className={`p-2 lg:px-4 md:mx-2 text-gray-400 text-6xl md:text-4xl hover:cursor-pointer hover:text-green-400 dark:hover:text-green-300 transition-colors duration-300 `}
            >
              Film
            </span>
          </Link>
          {/* blog */}
          <Link href="/blog">
            <span
              className={`p-2 lg:px-4 md:mx-2 text-sky-400 text-6xl md:text-4xl hover:text-pink-400 transition-colors duration-300 `}
            >
              Thoughts
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
