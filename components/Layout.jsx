import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Navbar from "./navbar";
import Subscribe from "./subscribe";

// TODO: Update to support dynamic headers
export default function Layout({ children }) {
  const router = useRouter();
  return (
    <div
      className={`min-h-screen pb-20 px-4 bg-[#F8F6F1] dark:bg-gradient-to-r dark:from-black dark:to-[#010F15] text-black dark:text-white`}
    >
      <Head>
        <title key={"title"}>Jett Hays</title>
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
        <div className="h-20" />
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
