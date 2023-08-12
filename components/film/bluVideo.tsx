"use client";

import { NextPage } from "next";
import ReactPlayer from "react-player";

interface Props {
  videoSrc: string;
  isPlaying: boolean;
}
const BluVideo: NextPage<Props> = (props) => {
  const { videoSrc, isPlaying } = { ...props };

  return (
    <div className="mx-auto">
      <ReactPlayer
        url={videoSrc}
        playing={isPlaying}
        controls={true}
        width="100%"
        style={{
          outline: "1px solid blue",
          borderRadius: "5px",
          padding: "5px",
          backgroundColor: "skyblue",
        }}
      />
    </div>
  );
};

export default BluVideo;
