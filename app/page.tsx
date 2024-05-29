import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-[90vh] -mx-4">
      <div className="flex place-items-center bg-gradient-conic from-sky-400 via-pink-400 to-transparent blur-2xl absolute bottom-20 right-0 w-[200px] h-[300px] lg:w-[400px]" />
      <h3 className="text-6xl md:text-8xl font-bold px-4 text-slate-800 dark:text-slate-50">
        Creating{" "}
        <Link href="research" className="text-pink-400">
          thinking machines
        </Link>{" "}
        and{" "}
        <Link href="blog" className="text-sky-400">
          happy minds
        </Link>
        .
      </h3>
      <div className="invisible md:visible h-[1px] bg-gray-400 w-1/2 mt-4 ml-4" />
      <div className="text-2xl px-4 mt-24 flex flex-col space-y-4 bg-gray-200/40 dark:bg-gray-900/40 py-2 z-2 md:bg-gray-200/10 md:dark:bg-gray-900/10 rounded-md w-fit z-10 absolute md:relative left-4 md:left-0 back bottom-20 backdrop-blur-lg">
        <a
          href="https://youtu.be/CfgAx7_LQQY"
          className="text-sky-400 md:text-green-400 hover:underline"
        >
          Watch My Latest Adventure
        </a>
        <Link
          href="/blog/epsilonCoverage"
          className="text-pink-400 md:text-green-400 hover:underline"
        >
          Read My Latest Thought
        </Link>
      </div>

      <Image
        src="/blu/partyhat.png"
        alt="hero"
        width={300}
        height={300}
        priority
        className="absolute m-auto bottom-0 right-0"
      />
    </main>
  );
}

// import React from "react";
// import ActivitiesSection from "../components/activities/ActivitiesSection";
// import ProfileCard from "../components/profile/ProfileCard";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="flex flex-col">
//       <div className="mx-auto max-w-2xl w-full pb-16">
//         <div className="mb-12">
//           <ProfileCard />
//         </div>
//         <Link
//           href="/adventures/summer23"
//           className="text-xl hover:font-semibold text-green-400 hover:cursor-pointer"
//         >
//           <p className="text-xl mb-5 py-2 px-2 bg-sky-400/20 rounded-md relative text-center">
//             <span className="mr-2">👀</span> Discover My{" "}
//             <span className="text-xl hover:font-semibold text-green-400 hover:cursor-pointer">
//               Latest Adventures
//             </span>
//             !
//             <span className="ml-2">☀️🌊</span>
//           </p>
//         </Link>
//         <div className="w-[100%] h-[2px] bg-gradient-to-r from-green-400 to-blue-500" />
//         <ActivitiesSection />
//       </div>
//     </main>
//   );
// }

// import React from "react";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex flex-col h-[92vh] -mx-4">
//       <Image
//         src="/blu/shock small.jpg"
//         alt="hero"
//         width={100}
//         height={100}
//         priority
//         className="rounded-full w-64 h-64 absolute m-auto top-20 left-0 right-0 bottom-0 ring-2 ring-slate-700/80 z-10"
//       />
//       <div className="h-1/2 w-full bg-sky-400/80 border-b-2 border-slate-700/80 flex items-center px-4 relative">
//         <p className="text-2xl absolute top-0 ">
//           Don't forget to live while you're busy existing.
//         </p>
//         <div className="max-w-3xl w-full mx-auto -mt-12 text-center">
//           <h3 className="text-5xl md:text-8xl font-bold">ADVENTURES</h3>
//         </div>
//       </div>
//       <div className="h-1/2 w-full bg-pink-400/80 flex items-center px-4 relative">
//         <p className="text-2xl absolute bottom-8">
//           Autonomous drones, mind controlled keyboards, and more.
//         </p>
//         <div className="max-w-3xl w-full mx-auto mt-12 text-center">
//           <h3 className="text-5xl md:text-8xl font-bold">RESEARCH</h3>
//         </div>
//       </div>
//     </main>
//   );
// }
