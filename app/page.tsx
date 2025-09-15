"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllDocs, getXMostRecentDocMetadata } from "../src/helpers/docs";
import { DocMetadata, DocType, DocTypeEnum } from "../src/helpers/docs/types";
import SearchDocs from "@/components/search/SearchDocs";

export default function Home() {
  async function populateRecentDocs() {
    const newRecentDocs = await getXMostRecentDocMetadata({
      docEnum: DocTypeEnum.Blog,
      x: 8,
    });
    setRecentDocs(newRecentDocs);
    setSelectedDoc(newRecentDocs[0]);
  }
  async function populateAllDocs() {
    const newAllDocs = await getAllDocs({ docEnum: DocTypeEnum.Blog });
    setAllDocs(newAllDocs);
  }
  useEffect(() => {
    populateRecentDocs();
    populateAllDocs();
  }, []);
  const [recentDocs, setRecentDocs] = useState<DocMetadata[]>([]);
  const [allDocs, setAllDocs] = useState<DocType[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocMetadata | null>(null);
  return (
    <main className="h-[90vh]">
      <div className="w-full h-3/4 flex flex-row mt-2 space-x-3 ">
        <div className="h-full md:w-1/2 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-3 h-fit">
            {recentDocs.map((doc) => (
              <div key={doc.slug}>
                {doc.image && (
                  <Image
                    src={doc.image}
                    alt={doc.title}
                    width={100}
                    height={100}
                    className={`w-40 h-40 object-cover rounded-lg ${selectedDoc?.slug == doc.slug ? "ring-2 ring-accent" : "ring-1 ring-secondary"} `}
                    onClick={() => setSelectedDoc(doc)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 h-full">
          {selectedDoc && (
            <div className="w-full h-full flex flex-col max-h-screen min-h-[91vh] px-4">
              {selectedDoc.image && (
                <Image
                  src={selectedDoc.image}
                  alt={selectedDoc.title}
                  width={500}
                  height={500}
                  className="object-cover h-2/3 mt-6 w-full rounded-lg ring-1 ring-accent"
                />
              )}

              <h4>{selectedDoc.title}</h4>

              <h6 className="">{selectedDoc.lastUpdate}</h6>

              <p>{selectedDoc.oneLiner}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
