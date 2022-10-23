import Head from "next/head";
import Navbar from "./navbar";
import { useBluThemeContext } from "./ThemeProvider";

// TODO: Update to support dynamic headers
export default function Layout({children}) {
    const {isDark, themeLoading} = useBluThemeContext();
    return (
      <div className={`min-h-screen pb-20 ${(isDark||themeLoading)?"dark bg-gradient-to-r from-black to-slate-900":"bg-white"} px-4`}>
        <Head>
          <title>Jett Hays</title>
          <meta name="description" content="Jett Hays is a machine learning student at CMU interested in sharing stories and building technology." />
          <link rel="icon" href="/icon.ico" />
        </Head>
        
      <main className={``}>
          <Navbar/>
        {children}
       </main>
    </div>
    );
  }
