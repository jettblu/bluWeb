"use client";

import { useEffect } from "react";

export default function ProfileCard() {
  const profileFlipCardId: string = "bluFlipCard";
  const profileFlipContentId: string = "bluFlipContent";

  function flipProfileCard() {
    if (!document) return;
    const flipCardContent = document.getElementById(profileFlipContentId);
    if (flipCardContent) {
      flipCardContent.classList.toggle("flipper");
    }
  }

  useEffect(() => {
    if (document) {
      const profileFlipCard = document.getElementById(profileFlipCardId);
      if (profileFlipCard) {
        profileFlipCard.addEventListener("mouseenter", flipProfileCard);
        profileFlipCard.addEventListener("mouseleave", flipProfileCard);
        profileFlipCard.addEventListener("click", flipProfileCard);
      }
    }
  }, []);

  return (
    <div id={profileFlipCardId} className="flip-card">
      <div
        id={profileFlipContentId}
        className="w-[100%] h-[300px] md:w-[300px] md:h-[300px] border border-1 border-sky-400 rounded-lg hover:border-green-400 flip-card-inner mx-auto"
      >
        <div className="flip-card-front bg-gray-50 dark:bg-gray-900 rounded-lg px-2 py-4">
          <div className="flex flex-row space-x-4">
            <img src="/blu/jett.png" className="object-cover w-16 h-16" />
            <p className="bluFont text-slate-800 dark:text-white text-5xl my-auto">
              Hey, I'm <span className="text-sky-400">Jett Hays</span>
            </p>
          </div>
          <div className="text-3xl bluFont text-slate-700 dark:text-slate-200">
            <p>Age: 20</p>
            <p>School: Carnegie Mellon</p>
            <p>Birthplace: California</p>
          </div>
        </div>

        <div className="flip-card-back px-2 py-4 bg-gray-50 dark:bg-gray-900 rounded-lg bluFont">
          <h1 className="text-4xl text-sky-400 mb-2">Mission</h1>
          <div className="text-3xl text-slate-800 dark:text-white">
            <p>
              My mission is to scale positive impact through technology. This is
              my story.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
