import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./navbar";
import Subscribe from "./subscribe";
import { useBluThemeContext } from "./ThemeProvider";

// TODO: Update to support dynamic headers
export default function Layout({children}) {
    const {isDark, themeLoading} = useBluThemeContext();
    const router = useRouter();
    return (
      <div className={`min-h-screen pb-20 ${(isDark||themeLoading)?"dark bg-gradient-to-r from-black to-slate-900":"bg-white"} px-4`}>
        <Head>
          <title>Jett Hays</title>
          <meta name="description" content="Hey, I'm Jett Hays! I make the world a better place through stories and technology. Right now, I attend Carnegie Mellon where I study statistics and machine learning." />
          <link rel="icon" href="/icon.ico" />
        </Head>
        
      <main className={``}>
          <Navbar/>
        {children}
         {
          router.pathname.includes("blog") &&
          <div className="fixed bottom-4 right-4">
              <Subscribe/>
          </div>
         }
       </main>
    </div>
    );
  }
