import type { NextPage } from "next";
import Head from "next/head";
import { films } from "../../src/film";
import { Film } from "../../src/film/types";
import FilmPreview from "../../components/film/filmPreview";

import type { Metadata } from "next";
import FilmThumbnail from "../../components/film/filmThumbnail";

export const metadata: Metadata = {
  title: "Jett's Films",
  description:
    "A curated collection of films: from my camera to your computer. Created by Jett Blu.",
};

const Home: NextPage = () => {
  return (
    <div className="dark:text-white mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 mx-auto text-left">
          <div className="">
            <h1 className="text-3xl text-sky-400 font-semibold mb-2">Film</h1>
            <p className="text-slate-700 dark:text-slate-200 text-xl">
              Cameras are a portal into the magical world of stories. Here are a
              few tales I've told.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-4 max-w-4xl mx-auto">
        {films.map((film: Film, index: number) => (
          <FilmPreview film={film} key={index}>
            <FilmThumbnail film={film} />
          </FilmPreview>
        ))}
      </div>
    </div>
  );
};

export default Home;
