import type { NextPage } from 'next'
import {useEffect, useState} from "react"
import Head from 'next/head'
import { films } from '../../src/film'
import { Film } from '../../src/film/types'
import FilmPreview from '../../components/film/filmPreview'



const Home: NextPage = () => {

  return (
    <div className="dark:text-white">
        <Head>
          <title>Film</title>
          <meta name="description" content="A curated collection of films: from my camera to your computer. Created by Jett Hays." />
        </Head>
        <div className="max-w-2xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-sky-400 to-green-400 mb-2">Film 📽️</h1>
                <p className="text-slate-700 dark:text-slate-200 text-xl">A curated collection of films: from my camera to your computer.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4">
                {
                    films.map((film:Film, index:number)=>
                        <FilmPreview film={film} key={index}/>
                    )
                }
            </div>
        </div>
    </div>
  )

}

export default Home