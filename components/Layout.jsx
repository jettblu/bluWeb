import Head from "next/head";
import Navbar from "./navbar";

// TODO: Update to support dynamic headers
export default function Layout({children}) {

    return (
        <div className={`min-h-screen pb-20 bg-gradient-to-r from-black to-slate-900 px-4`}>
        <Head>
          <title>Jett Hays</title>
          <meta name="description" content="Jett Hays is a machine learning student at CMU interested in sharing stories and building technology." />
          <link rel="icon" href="/icon.ico" />
        </Head>
        
      <main className={`mx-`}>
          <Navbar/>
        {children}
       </main>
    </div>
    );
  }
