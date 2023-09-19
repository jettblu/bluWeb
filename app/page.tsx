import React from "react";
import SplashImage from "../components/splash/SplashImage";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="h-[10vh]" />
      <div className="bluFont z-10 text-left bg-sky-400/10 w-fit p-2 rounded-md backdrop-blur-xl">
        <h1 className="text-8xl">Hi, I'm Jett</h1>
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
    </main>
  );
}
