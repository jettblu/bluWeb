import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Navbar from "./navbar";
import Subscribe from "./subscribe";
import { useBluThemeContext } from "./ThemeProvider";

// TODO: Update to support dynamic headers
export default function Layout({ children }) {
  const { isDark, themeLoading } = useBluThemeContext();
  const router = useRouter();
  return (
    <div
      className={`min-h-screen pb-20 ${
        isDark || themeLoading
          ? "dark bg-gradient-to-r from-black to-slate-900"
          : "bg-white"
      } px-4`}
    >
      <Head>
        <title>Jett Hays</title>
        <meta
          name="description"
          content="Hey, I'm Jett Hays! I make the world a better place through stories and technology. Right now, I attend Carnegie Mellon where I study statistics and machine learning."
        />
        <link rel="icon" href="/icon.ico" />
        {/* to do: defer loading to speed up page load */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        ></link>
      </Head>

      <main className={``}>
        <Navbar />
        <Toaster />
        {children}
        {router.pathname.includes("blog") && (
          <div className="fixed bottom-4 right-4">
            <Subscribe />
          </div>
        )}
      </main>
    </div>
  );
}
