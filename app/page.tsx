import React from "react";
import ActivitiesSection from "../components/activities/ActivitiesSection";
import ProfileCard from "../components/profile/ProfileCard";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="mx-auto max-w-2xl w-full">
        <div className="mb-12">
          <ProfileCard />
        </div>
        <div className="w-[100%] h-[2px] bg-gradient-to-r from-green-400 to-blue-500" />
        <ActivitiesSection />
      </div>
    </main>
  );
}
