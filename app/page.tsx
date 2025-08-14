"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getXMostRecentDocMetadata } from "../src/helpers/docs";
import { DocMetadata, DocTypeEnum } from "../src/helpers/docs/types";

export default function Home() {
  async function populateRecentDocs() {
    const newRecentDocs = await getXMostRecentDocMetadata({
      docEnum: DocTypeEnum.Blog,
      x: 8,
    });
    setRecentDocs(newRecentDocs);
    setSelectedDoc(newRecentDocs[0]);
  }
  useEffect(() => {
    populateRecentDocs();
  }, []);
  const [recentDocs, setRecentDocs] = useState<DocMetadata[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocMetadata | null>(null);
  return (
    <main className="h-[90vh]">
      <div className="w-full h-3/4 flex flex-row mt-2 space-x-3">
        <div className="h-full md:w-1/2 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-3 h-fit">
            {recentDocs.map((doc) => (
              <div key={doc.slug}>
                {doc.image && (
                  <div
                    className={`hover:cursor-pointer transition-all duration-300 p-2 ${
                      selectedDoc?.slug === doc.slug
                        ? "ring-2 ring-sky-400 bg-green-400/30"
                        : "ring-1 ring-slate-200 hover:brightness-125"
                    }`}
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <Image
                      src={doc.image}
                      alt={doc.title}
                      width={100}
                      height={100}
                      className="w-40 h-40 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 h-full">
          {selectedDoc && (
            <div className="w-full h-full mt-48 space-y-2 flex flex-col">
              <div className="flex flex-row items-center justify-center">
                {selectedDoc.image && (
                  <div className="place-items-center w-full">
                    <Image
                      src={selectedDoc.image}
                      alt={selectedDoc.title}
                      width={500}
                      height={500}
                      className="w-8/12 h-8/12 rounded-md object-cover self-center"
                    />
                  </div>
                )}
              </div>
              <div className="w-full place-items-center">
                <div className="bg-gradient-to-r from-sky-400/20 to-green-400/20 rounded-md p-2 w-fit">
                  <h3>{selectedDoc.title}</h3>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <p>{selectedDoc.lastUpdate}</p>
              </div>
              <p>{selectedDoc.oneLiner}</p>
            </div>
          )}
        </div>
      </div>
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
