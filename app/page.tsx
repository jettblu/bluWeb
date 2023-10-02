import React from "react";
import ActivitiesSection from "../components/activities/ActivitiesSection";
import ProfileCard from "../components/profile/ProfileCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="mx-auto max-w-2xl w-full pb-16">
        <div className="mb-12">
          <ProfileCard />
        </div>
        <Link
          href="/adventures/summer23"
          className="text-xl hover:font-semibold text-green-400 hover:cursor-pointer"
        >
          <p className="text-xl mb-5 py-2 px-2 bg-sky-400/20 rounded-md relative">
            <span className="mr-2">👀</span> Check out my{" "}
            <span className="text-xl hover:font-semibold text-green-400 hover:cursor-pointer">
              Summer 23 Recap
            </span>
            <span className="ml-2">☀️🌊</span>
          </p>
        </Link>
        <div className="w-[100%] h-[2px] bg-gradient-to-r from-green-400 to-blue-500" />
        <ActivitiesSection />
      </div>
    </main>
  );
}
