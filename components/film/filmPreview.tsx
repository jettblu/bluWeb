"use client";

import { NextPage } from "next";
import { useState } from "react";
import { Film } from "../../src/film/types";
import BluVideo from "./bluVideo";
import Modal from "../modals/modal";

interface Props {
  film: Film;
}
const FilmPreview: NextPage<Props> = (props) => {
  const { film } = { ...props };

  const filmCardId = `${film.title}Card`;
  const [showModal, setShowModal] = useState(false);

  function handlePreviewClicked() {
    // pop vimeo vids up in app
    // if (film.url.toLowerCase().includes("vimeo")) {
    //   const newWindow = window.open(film.url, "_blank", "noopener,noreferrer");
    //   if (newWindow) newWindow.opener = null;
    //   return;
    // }
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  return (
    <div className="mx-auto">
      <div
        className="mx-auto hover:z-10 transition ease-in-out hover:scale-110 hover:cursor-pointer"
        onClick={() => handlePreviewClicked()}
      >
        <img
          src={film.thumbnailPath}
          className="hover:shadow-md hover:shadow-sky-400 w-70 h-44 rounded-md drop-shadow-lg object-cover"
        />
        <div className="flex">
          <p className="my-2 text-lg text-gray-400 dark:text-gray-400 font-semibold">
            {film.title}
          </p>
        </div>
      </div>
      <Modal isOpen={showModal} onRequestClose={handleModalClose}>
        {/* video info card */}
        <div
          id={filmCardId}
          className="flex-1 bg-white dark:bg-black md:ml-6 mt-8 md:mt-0 rounded-lg min-h-[30rem] md:min-h-[25rem] h-fit md:max-h-[40rem] dark:border border-gray-400 w-[380px] md:w-[600px] max-w-sm md:max-w-xl dark:border-gray-100 md:overflow-x-hidden overflow-y-auto no-scrollbar"
        >
          <div className="mx-3 mt-3 text-black dark:text-white">
            <div>
              <h1 className="font-bold text-2xl text-sky-400">{film.title}</h1>
            </div>

            <div className="my-4">
              <div className="w-full mx-auto">
                <BluVideo videoSrc={film.url} isPlaying={showModal} />
              </div>

              <div>
                <h2 className="text-lg dark:text-white font-bold mt-2">
                  Description
                </h2>
                <p className="text-gray-400 dark:text-gray-300">
                  {film.description}
                </p>
              </div>

              <div className="h-[2rem] dark:text-white">
                {/* padding div for space between top and main elements */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FilmPreview;
