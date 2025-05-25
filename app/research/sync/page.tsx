import { NextPage } from "next";

import BluVideo from "../../../components/film/bluVideo";
import { Metadata } from "next";

// update metadata
export const metadata: Metadata = {
  title: "SYNC - Jett's Research",

  description:
    "SYNC is a peer-to-peer data sharing protocol. It allows users to share data between devices without a central server using a QR code stream.",
};

const Home: NextPage = () => {
  return (
    <div className="text-black dark:text-white">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-green-600 to-green-500 mb-2 text-center">
            SYNC
          </h1>
          <p className="text-slate-700 dark:text-slate-200 text-xl font-semibold text-center">
            Peer to Peer QR Streams
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-12 mx-auto w-full max-w-[640px]">
          <BluVideo
            videoSrc={"https://vimeo.com/802871414"}
            isPlaying={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
