"use client";
import { NextPage } from "next";
import { useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  videoSrc: string;
  isPlaying: boolean;
  isLoop?: boolean;
  onReadyCallback?: () => void;
}
const VideoPlayerSplash: NextPage<Props> = (props) => {
  const { videoSrc, isPlaying, onReadyCallback } = { ...props };
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  function handleOnReady() {
    setPlayVideo(true);
    if (onReadyCallback) {
      onReadyCallback();
    }
  }

  return (
    // <div className="h-full">
    //   <ReactPlayer
    //     url={videoSrc}
    //     playing={true}
    //     loop={true}
    //     controls={false}
    //     light={false}
    //     width="100%"
    //     height="100%"
    //     onReady={() => handleOnReady()}
    //     muted
    //   />
    // </div>
    <video
      autoPlay
      muted
      loop
      id="splashVideo"
      className="w-full h-full object-cover"
      onCanPlayThrough={() => handleOnReady()}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};

export default VideoPlayerSplash;
