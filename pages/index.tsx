import type { NextPage } from 'next'
import {useEffect, useState} from "react"
import Head from 'next/head'
import Tilt from 'react-parallax-tilt';

import { BluFetch, IBluFetchResponse } from '../src/helpers/BluFetch'
import { Activity, ActivityType } from '../src/helpers/strava/types'
import { getTotalDistance } from '../src/helpers/strava'
import { metersToMiles, secondsToMinutes } from '../src/helpers/utils'
import { parseStravaActivityList } from '../src/helpers/strava/parse'
import Link from 'next/link'


const Home: NextPage = () => {
  const profileFlipCardId:string = "bluFlipCard"
  const profileFlipContentId:string = "bluFlipContent";
  const [totalMilesRan, setTotalMilesRan] = useState(0);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [recentRun, setRecentRun] = useState<Activity|null>(null);

  async function fetchRunningData(){
    // if we already have activities don't fetch again
    if(activities.length!=0) return;
    setLoadingActivities(true);
    try{
      let runningDataResponse:IBluFetchResponse = await BluFetch('/api/activities', {method:"GET", timeout:8000, headers:{'Content-Type': 'application/json',}})
      const newActivities:Activity[]|null = parseStravaActivityList(runningDataResponse.data.activities);
      console.log(runningDataResponse);
      if(!newActivities){
        setLoadingActivities(false);
        return;
      }
      const newTotalMilesRan:number = getTotalDistance(newActivities, ActivityType.run);
      const newRuns:Activity[] = newActivities.filter(a=>a.type==ActivityType.run)
      // assuming we receive activities w/ bigger index meaning more recent
      const newRecentRun:Activity|null = newRuns.length>0?newRuns[newRuns.length-1]:null;
      setTotalMilesRan(newTotalMilesRan);
      setActivities(newActivities);
      setRecentRun(newRecentRun);
      setLoadingActivities(false);
    }
    catch(e){
      console.warn("Unable to fetch strava activity");
      setLoadingActivities(false);
    }

  }

  function flipProfileCard(){
    console.log("hit!")
    if(!document) return;
    const flipCardContent = document.getElementById(profileFlipContentId);
    if(flipCardContent){
      console.log("wee")
      flipCardContent.classList.toggle("flipper");
    }
  }

  useEffect(()=>{
    if(document){
      const profileFlipCard = document.getElementById(profileFlipCardId);
      if(profileFlipCard){
        profileFlipCard.addEventListener("mouseenter", flipProfileCard)
        profileFlipCard.addEventListener("mouseleave", flipProfileCard)
        profileFlipCard.addEventListener("click", flipProfileCard)
      }
      
    }
     // on page load... fetch data
    fetchRunningData()
  },[])
  return (
    <div className="dark:text-white">

        <div className="max-w-2xl mx-auto">
        <div className="h-[10vh]">
          {/* space filler between top and main elements */}
        </div>

        <div className="mb-12">

          <div id={profileFlipCardId} className="flip-card">
            <div id={profileFlipContentId} className="bg-black w-[100%] h-[300px] md:w-[300px] md:h-[300px] outline outline-1 outline-sky-400 rounded-lg hover:outline-green-400 flip-card-inner mx-auto">
              

              <div className="flip-card-front bg-gray-900 rounded-lg px-2 py-4">
                <div className="flex flex-row space-x-4">
                  <img src="/blu/jett.png" className="object-cover w-16 h-16"/>
                <p className="bluFont text-5xl my-auto">Hey, I'm <span className="text-sky-400">Jett Hays</span></p>
                </div>
                <div className="text-3xl bluFont dark:text-slate-200">
                  
                    <p>Age: 20</p>
                    <p>School: Carnegie Mellon</p>
                    <p>Birthplace: California</p>
                  
                </div>
              </div>

              <div className="flip-card-back px-2 py-4 bg-gray-900 rounded-lg bluFont">
                <h1 className="text-4xl text-sky-400 mb-2">Mission</h1>
                <div className="text-3xl">
                    <p>My mission is to scale positive impact through technology. This is my story.</p>
                </div>
              </div>


          </div>
          </div>


        </div>
        <div className="w-[100%] h-[2px] bg-gradient-to-r from-green-400 to-blue-500"/>
        <div>
              <div className="mt-8 mb-8">
                <h1 className="text-3xl font-bold">What I Do</h1>
                <p className="text-lg text-slate-200">I create stories and technology that make the world a better place. My adventures have taken me from assembly and silicon to skydiving and the jungles of Hawaii.</p>
                <Link href="/blog">
                <div className="rounded-xl bg-gray-200 text-black font-bold w-fit p-2 text-xl my-2 hover:cursor-pointer hover:bg-green-400">
                  <h1>Read the Blog</h1>
                </div>
                </Link>
              </div>
              
              <div className="grid grid- md:grid-cols-2 gap-x-2 gap-y-4">

              <div className='flex flex-col space-y-4'>
              {/* kryptik card */}
              <Tilt>
              <a href="https://kryptik.app" target="_blank" rel="noopener noreferrer">
              <div className="rounded-lg border border-gray-900 bg-gray-800 bg-gradient-to-r from-sky-600 via-sky-600 to-emerald-600">
                  <div className="py-4 px-2">
                    <div className="flex flex-row space-x-2">
                      <img src="/kryptik/kryptikEyez.png" className="h-4 w-auto my-auto"/>
                      <p className="text-white text-2xl font-bold">
                    Kryptik
                    </p>
                    </div>
                    
                    <p className="text-lg dark:text-slate-200">I'm building a digital wallet that simpifies and secures online ownership.</p>
                  </div>
                </div>
                </a>
              </Tilt>
                

                {/* running card */}
                <Tilt>
                <a href="https://www.strava.com/athletes/94038785" target="_blank" rel="noopener noreferrer">
                <div className="rounded-lg bg-gradient-to-r from-sky-500 to-indigo-700 md:from-pink-500 md:to-purple-500 flex flex-row">
                <img src="/blog/marathonBefore.jpg" className="w-28 h-auto object-cover rounded-l-lg"/>
                <div className="py-4 px-2">
                  <p className="text-white text-2xl font-bold">
                  Training
                  </p>
                  <p className="text-lg dark:text-slate-200">When I'm not flipping bits and bytes, I like to train for triathlons. Over the past seven months, I've ran <span className="text-xl font-semibold">{
                    !loadingActivities?
                      <span>{totalMilesRan.toFixed(2)} </span>:
                      <span className='rounded-md animate-pulse bg-slate-200 dark:bg-slate-700 animate-pulse w-20 h-10 min-h-12 min-w-20 mr-2 inline block px-4'>....</span>
                    }
                    <span className="inline">miles</span></span>. My last run was 
                    {
                      (!loadingActivities && recentRun)?
                      <span> <span className="">{metersToMiles(recentRun.distance).toFixed(2)}</span> miles long and took <span className="">{secondsToMinutes(recentRun.movingTime).toFixed(0)}</span> minutes.</span>:
                      <span className='rounded-md animate-pulse bg-slate-200 dark:bg-slate-700 animate-pulse w-20 h-10 min-h-12 min-w-20 ml-2 inline block px-4'>....</span>
                    }
                    </p>
                </div>
                </div>
                </a>
                </Tilt>
              </div>


              <div className='flex flex-col space-y-4'>
              
                {/* spiritual warfare card */}
                <Tilt>
                <a href="https://www.amazon.com/dp/B096TQ67P1" target="_blank" rel="noopener noreferrer">
                <div className="rounded-lg border border-gray-900 bg-gray-800 bg-gradient-to-r from-sky-400 to-blue-500 flex flex-row">
                  <img src="/spiritualWarfare/mockup.png" className="w-28 h-28 my-auto"/>
                  <div className="py-4 px-2">
                    <p className="text-white text-2xl font-bold">
                    Spiritual Warfare
                    </p>
                    <p className="text-lg dark:text-slate-200">I published a book on what we do and why at the age of 18.</p>
                  </div>
                </div>
                </a>
                </Tilt>

                {/* brainstorm card */}
                <Tilt>
                <Link href="/research">
                <div className="rounded-lg hover:cursor-pointer border border-gray-900 bg-gray-800 bg-gradient-to-r from-purple-400 to-blue-500 flex flex-row">
                  <div className="py-4 px-2">
                    <p className="text-white text-2xl font-bold">
                    Brainstorm 💻🧠⚡
                    </p>
                    <p className="text-lg dark:text-slate-200">I created a mind controlled keyboard that translates brainwaves into language. Brainstorm was sponsored by CMU with a small undergraduate research grant.</p>
                  </div>
                </div>
                </Link>
                </Tilt>

              </div>
              

              </div>

              </div>
        </div>


      


    </div>
  )
}

export default Home
