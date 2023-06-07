import { NextPage } from "next";
import Link from "next/link";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const Navbar: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [isMenuMobile, setMenuMobile] = useState(false);
  const router = useRouter();

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
    ? "flex flex-col md:flex-row mx-auto h-[100vh] md:ml-auto mt-8 md:mt-0 z-20 pl-8"
    : "hidden md:flex md:flex-row md:ml-auto md:mt-0";

  function handleDarkToggle() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <nav className="">
      <div
        className={`mx-auto md:flex md:items-center fixed top-0 z-10 w-full -mx-4 px-4 ${
          !isMenuMobile && !isDark && "bg-[#F8F6F1]/50"
        } ${isMenuMobile && !isDark && "bg-[#F8F6F1]"} ${
          !isMenuMobile &&
          isDark &&
          "bg-gradient-to-r from-black to-[#010F15]/80"
        } ${
          isMenuMobile && isDark && "bg-gradient-to-r from-black to-[#010F15]"
        }`}
      >
        <div className="flex justify-between items-center hover:cursor-pointer">
          <div onClick={() => setMenuMobile(false)}>
            {
              <Link href="/">
                <img
                  src={isDark ? "/head.jpg" : "/icon.ico"}
                  className="w-20 h-auto"
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
          <div
            className="invisible md:visible w-fit h-fit p-1 hover:border hover:border-1 hover:outline-black hover:dark:border-white rounded-full text-slate-400 dark:text-white"
            onClick={() => handleDarkToggle()}
          >
            {isDark ? <RiMoonFill size={20} /> : <RiSunFill size={20} />}
          </div>
          <Link href="/research">
            <span
              className={`p-2 lg:px-4 md:mx-2 text-gray-400 text-3xl md:text-xl hover:cursor-pointer hover:text-green-400 dark:hover:text-green-300 transition-colors duration-300 ${
                router.pathname == "/research" ? "font-bold" : ""
              } `}
            >
              Research
            </span>
          </Link>
          <Link href="/film">
            <span
              className={`p-2 lg:px-4 md:mx-2 text-gray-400 text-3xl md:text-xl hover:cursor-pointer hover:text-green-400 dark:hover:text-green-300 transition-colors duration-300 ${
                router.pathname == "/film" ? "font-bold" : ""
              } `}
            >
              Film
            </span>
          </Link>
          {/* blog */}
          <Link href="/blog">
            <span
              className={`p-2 lg:px-4 md:mx-2 text-green-400 text-3xl md:text-lg md:text-center md:border md:border-solid md:border-gray-300 md:dark:border-gray-600 md:dark:hover:border-sky-200 rounded hover:bg-green-400 hover:cursor-pointer hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1`}
            >
              Thoughts
            </span>
          </Link>
          <div className="-ml-8 md:hidden">
            <div
              className="mt-40 mx-auto w-fit p-4 border border-gray-400 dark:border-gray-500 rounded-full flex flex-row space-x-2 text-slate-900 dark:text-slate-100 hover:cursor-pointer"
              onClick={() => handleDarkToggle()}
            >
              {isDark ? <RiMoonFill size={20} /> : <RiSunFill size={20} />}
              <p className="text-md">
                switch to {isDark ? "light" : "dark"} mode
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
