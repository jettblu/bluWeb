"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

import Link from "next/link";
import { IBluFetchResponse, BluFetch } from "../../src/helpers/BluFetch";
import { Activity } from "../../src/helpers/strava/types";
import { metersToMiles, secondsToMinutes } from "../../src/helpers/utils";
import { useBluDataContext } from "../DataProvider";

const ActivitiesSection: NextPage = () => {
  const [loadingActivities, setLoadingActivities] = useState(false);
  const {
    updateActivities,
    loadingStravaData,
    activities,
    totalMilesRan,
    recentRun,
  } = useBluDataContext();

  async function fetchRunningData() {
    // if we already have activities don't fetch again
    if (activities.length != 0) return;
    if (!loadingStravaData) {
      return;
    }
    setLoadingActivities(true);
    try {
      let runningDataResponse: IBluFetchResponse = await BluFetch(
        "/api/activities",
        {
          method: "GET",
          timeout: 8000,
          headers: { "Content-Type": "application/json" },
        }
      );
      const newActivities: Activity[] | null =
        runningDataResponse.data.activities;
      if (!newActivities) {
        setLoadingActivities(false);
        return;
      }
      updateActivities(newActivities);
      setLoadingActivities(false);
    } catch (e) {
      console.warn("Unable to fetch strava activity");
      setLoadingActivities(false);
    }
  }

  useEffect(() => {
    // on page load... fetch data
    // fetchRunningData();
  }, []);
  return (
    <div className="">
      <div className="max-w-2xl mx-auto">
        <div className="w-[100%] h-[2px] bg-gradient-to-r from-green-400 to-blue-500" />
        <div>
          <div className="mt-8 mb-8">
            <h1 className="text-3xl font-bold">What I Do</h1>
            <p className="text-lg text-slate-700 dark:text-slate-200">
              I create stories and technology that make the world a better
              place. My adventures have taken me from assembly and silicon to
              skydiving and the jungles of Hawaii.
            </p>
            <Link href="/blog">
              <div className="rounded-xl bg-gray-200 text-black font-bold w-fit p-2 text-xl my-2 hover:cursor-pointer hover:bg-green-400">
                <h1>Read the Blog</h1>
              </div>
            </Link>
          </div>

          <div className="grid grid- md:grid-cols-2 gap-x-2 gap-y-4">
            <div className="flex flex-col space-y-4">
              {/* kryptik card */}
              <Tilt>
                <a
                  href="https://kryptik.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rounded-lg bg-gradient-to-r from-sky-600 via-sky-600 to-emerald-600">
                    <div className="py-4 px-2">
                      <div className="flex flex-row space-x-2">
                        <img
                          src="/kryptik/kryptikEyez.png"
                          className="h-4 w-auto my-auto"
                        />
                        <p className="text-white text-2xl font-bold">Kryptik</p>
                      </div>

                      <p className="text-lg text-slate-200">
                        I'm building a digital wallet that simpifies and secures
                        online ownership.
                      </p>
                    </div>
                  </div>
                </a>
              </Tilt>

              {/* running card */}
              <Tilt>
                <a
                  href="https://www.strava.com/athletes/94038785"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rounded-lg bg-gradient-to-r from-sky-500 to-indigo-700 md:from-pink-500 md:to-purple-500 flex flex-row">
                    <img
                      src="/blog/marathonBefore.jpg"
                      className="w-28 h-auto object-cover rounded-l-lg"
                    />
                    <div className="py-4 px-2">
                      <p className="text-white text-2xl font-bold">Training</p>
                      <p className="text-lg text-slate-200">
                        When I'm not flipping bits and bytes, I like to train
                        for triathlons. I ran my first half Ironman in May 2023
                        at Morro Bay.
                      </p>
                    </div>
                  </div>
                </a>
              </Tilt>
            </div>

            <div className="flex flex-col space-y-4">
              {/* spiritual warfare card */}
              <Tilt>
                <a
                  href="https://www.amazon.com/dp/B096TQ67P1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 flex flex-row">
                    <img
                      src="/spiritualWarfare/mockup.png"
                      className="w-28 h-28 my-auto"
                    />
                    <div className="py-4 px-2">
                      <p className="text-white text-2xl font-bold">
                        Spiritual Warfare
                      </p>
                      <p className="text-lg text-slate-200">
                        I published a book on what we do and why at the age of
                        18.
                      </p>
                    </div>
                  </div>
                </a>
              </Tilt>

              {/* brainstorm card */}
              <Tilt>
                <Link href="/research">
                  <div className="rounded-lg hover:cursor-pointer bg-gradient-to-r from-purple-400 to-blue-500 flex flex-row">
                    <div className="py-4 px-2">
                      <p className="text-white text-2xl font-bold">
                        Brainstorm 💻🧠⚡
                      </p>
                      <p className="text-lg text-slate-200">
                        I created a mind controlled keyboard that translates
                        brainwaves into language. Brainstorm was sponsored by
                        CMU with a small undergraduate research grant.
                      </p>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesSection;
