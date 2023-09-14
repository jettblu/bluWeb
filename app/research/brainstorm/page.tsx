import { NextPage } from "next";
import Head from "next/head";

import Link from "next/link";
import Divider from "../../../components/Divider";
import BluVideo from "../../../components/film/bluVideo";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brainstorm - Jett's Research",
  description:
    "Brainstorm is a mind controlled keyboard. It allows users to type with their mind using a brain-computer interface.",
};

const Home: NextPage = () => {
  return (
    <div className="text-black dark:text-white">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-sky-400 to-blue-500 mb-2 text-center">
            Brainstorm
          </h1>
          <p className="text-slate-700 dark:text-slate-200 text-xl font-semibold text-center">
            Type With Your Mind
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-12 mx-auto w-full max-w-[640px]">
          <BluVideo
            videoSrc={"https://www.youtube.com/watch?v=3ONCUlBnBXE"}
            isPlaying={false}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-4">
          {/* software card */}
          <div className="dark:bg-gray-900 rounded-lg px-2 py-4 hover:shadow-md hover:shadow-sky-400 border border-gray-300 dark:border-gray-600">
            <h2 className="text-2xl font-semibold mb-2">Software</h2>
            <p className="text-lg text-green-600">
              An analysis of the design principles behind Brainstorm.
            </p>
            <Divider />
            <div className="flex flex-row space-x-4 text-sky-400 text-lg font-bold">
              <Link href="../blog/brainstormSoftware">Read</Link>
              <a href="/brainstorm/Brainstorm Software.pdf" download>
                Download
              </a>
            </div>
          </div>
          {/* overview card */}
          <div className="dark:bg-gray-900 rounded-lg px-2 py-4 hover:shadow-md hover:shadow-sky-400 border border-gray-300 dark:border-gray-600">
            <h2 className="text-2xl font-semibold mb-2">System Overview</h2>
            <p className="text-lg text-green-600">
              A high level overview of what Brainstorm is and how it works.
            </p>
            <Divider />
            <div className="flex flex-row space-x-4 text-sky-400 text-lg font-bold">
              <Link href="../blog/brainstormOverview">Read</Link>
              <a href="/brainstorm/Brainstorm High Level.pdf" download>
                Download
              </a>
            </div>
          </div>
          {/* poster card */}
          <div className="dark:bg-gray-900 rounded-lg px-2 py-4 hover:shadow-md hover:shadow-sky-400 border border-gray-300 dark:border-gray-600">
            <h2 className="text-2xl font-semibold mb-2">Research Poster</h2>
            <p className="text-lg text-green-600">
              A visual exploration of the research that resulted in Brainstorm.
            </p>
            <Divider />
            <div className="flex flex-row space-x-4 text-sky-400 text-lg font-bold">
              <a href="/brainstorm/poster.pdf" download>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
