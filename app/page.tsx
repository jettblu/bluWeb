import React from "react";
import SplashImage from "../components/splash/SplashImage";
import ActivitiesSection from "../components/activities/ActivitiesSection";
import Profile from "./profile/page";
import ProfileCard from "../components/profile/ProfileCard";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="h-[10vh]" />
      <div className="bluFont z-10 text-left bg-sky-400/10 md:bg-sky-400/70 md:ring-1 ring-green-400 w-fit p-2 rounded-md backdrop-blur-xl mx-auto">
        <h1 className="text-8xl">
          Hey, I'm <span className="text-green-400">Jett Hays</span>
        </h1>
        <p className="text-4xl">
          I weave bits and bytes into the fabric of reality.
        </p>
      </div>
      <SplashImage />
      {/* <div className="mx-auto max-w-2xl w-full">
        <div className="mb-12">
          <ProfileCard />
        </div>
        <div className="w-[100%] h-[2px] bg-gradient-to-r from-green-400 to-blue-500" />
        <ActivitiesSection />
      </div> */}
      <div className="h-[80vh]" />
      <ActivitiesSection />
    </main>
  );
}
