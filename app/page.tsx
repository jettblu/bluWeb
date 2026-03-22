import React from "react";
import Image from "next/image";
import Link from "next/link";

/** Inline conic gradient so the halo always renders (Tailwind v4 + @config can omit legacy bg-gradient-conic). */
const HALO_GRADIENT =
  "conic-gradient(from 180deg at 50% 50%, rgb(56, 189, 248), rgb(244, 114, 182), transparent)";

export default function Home() {
  return (
    <main className="relative flex min-h-[90vh] w-full max-w-full flex-col pb-80 sm:pb-96 lg:pb-[28rem]">
      <h3 className="relative z-20 px-0 text-5xl font-bold text-slate-800 sm:text-6xl md:text-7xl lg:text-8xl dark:text-slate-50">
        Creating{" "}
        <Link href="/research" className="text-pink-400">
          thinking machines
        </Link>{" "}
         and{" "}
        <Link href="/blog" className="text-sky-400">
          happy minds
        </Link>
        .
      </h3>
      <div className="relative z-10 mt-3 ml-0 h-px w-1/2 max-w-md bg-gray-300 dark:bg-gray-600 sm:mt-4" />
      <div className="relative z-10 mt-3 flex w-fit max-w-full flex-col space-y-3 text-lg font-medium text-green-500 sm:mt-4 sm:space-y-3.5 sm:text-xl md:text-2xl">
        <a
          href="https://youtu.be/CfgAx7_LQQY"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit hover:underline"
        >
          Watch My Latest Adventure
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        <Link
          href="/blog/epsilonCoverage"
          className="w-fit hover:underline"
        >
          Read My Latest Thought
        </Link>
      </div>

      {/* Original placement: bottom-20, conic sky → pink → transparent, blur-2xl; fixed to viewport so main padding doesn't lift it */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-20 right-0 z-[8] flex h-[300px] w-[200px] place-items-center blur-2xl lg:w-[400px]"
        style={{ background: HALO_GRADIENT }}
      />

      <div className="fixed bottom-0 right-0 z-[9] leading-[0]">
        <Image
          src="/blu/partyhat.png"
          alt="hero"
          width={440}
          height={440}
          priority
          className="block h-auto max-w-[300px] object-contain object-bottom"
        />
      </div>
    </main>
  );
}
