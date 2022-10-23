import { NextPage } from "next"
import Link from 'next/link'
import { RiMoonFill, RiSunFill } from "react-icons/ri";

import { useState } from "react";
import { useRouter } from "next/router";
import { useBluTheme } from "../src/bluThemeHelper";
import { useBluThemeContext } from "./ThemeProvider";



const Navbar:NextPage = () => {
    const {isDark, updateIsDark} = useBluThemeContext()
    const [isMenuMobile, setMenuMobile] = useState(false);
    const router = useRouter();


    // change style based on boolean
    const menuWrapperClassName = isMenuMobile
        ? "flex flex-col md:flex-row mx-auto min-h-[100vh] md:min-h-0 md:ml-auto mt-8 md:mt-0 z-20 md:z-0 pl-8"
        : "hidden md:flex md:flex-row md:ml-auto mt-3 md:mt-0";

    function handleDarkToggle(){
        updateIsDark(!isDark);
    }

        
    return(
        <nav className="">
            <div className="px-4 mx-auto md:flex md:items-center">

            <div className="flex justify-between items-center hover:cursor-pointer">
                <div onClick={()=>setMenuMobile(false)}>
                    {
                        <Link href="/">
                        <img src={isDark?"/head.jpg":"/icon.ico"} className="w-20 h-auto"/>
                        </Link>
                    }
                    
                </div>
                <button id="nav-icon" onClick={()=>setMenuMobile(!isMenuMobile)} type="button" className={`md:hidden inline-flex ${isMenuMobile && "open"} items-center ml-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} aria-controls="mobile-menu" aria-expanded="false">
                <span className="bg-gray-500 dark:bg-gray-400"></span>
                <span className="bg-gray-500 dark:bg-gray-400"></span>
                <span className="bg-gray-500 dark:bg-gray-400"></span>
                </button>
            </div>
            <div id="menu" className={menuWrapperClassName} onClick={()=>setMenuMobile(false)}>
                <div className="w-fit h-fit p-1 mt-2 hover:outline hover:outline-1 hover:outline-black hover:dark:outline-white rounded-full text-slate-400 dark:text-white" onClick={()=>handleDarkToggle()}>
                {
                    isDark?
                    <RiMoonFill size={20}/>:
                    <RiSunFill size={20}/>
                }
                </div>
                <Link href="/research"><span className={ `p-2 lg:px-4 md:mx-2 text-gray-400 text-3xl md:text-xl hover:cursor-pointer hover:text-green-400 dark:hover:text-green-300 transition-colors duration-300 ${router.pathname == "/research" ? "font-bold" : ""} `}>Research</span></Link>
                <Link href="/film"><span className={ `p-2 lg:px-4 md:mx-2 text-gray-400 text-3xl md:text-xl hover:cursor-pointer hover:text-green-400 dark:hover:text-green-300 transition-colors duration-300 ${router.pathname == "/film" ? "font-bold" : ""} `}>Film</span></Link>
                {/* blog */}
                <Link href="/blog"><span className={`p-2 lg:px-4 md:mx-2 text-green-400 text-3xl md:text-lg md:text-center md:border md:border-solid md:border-gray-300 md:dark:border-gray-600 md:dark:hover:border-sky-200 rounded hover:bg-green-400 hover:cursor-pointer hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1`}>Thoughts</span></Link>
            </div>
            </div>
        </nav>
    )
    
}

export default Navbar