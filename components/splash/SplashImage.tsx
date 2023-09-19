"use client";
import { useState } from "react";
import Image from "next/image";
import VideoPlayerHype from "./VideoPlayerSplash";
import VideoPlayerSplash from "./VideoPlayerSplash";

export default function SplashImage() {
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  function handleOnLoad() {
    setShowPlaceholder(false);
  }

  return (
    <div className="absolute top-[80px] left-0 w-full h-full z-0">
      {showPlaceholder && (
        <Image
          src="/splash/overlook.jpg"
          width={200}
          height={200}
          alt="Incredible overlook of Hawaiin mountains."
          className={`h-full w-full object-cover`}
        />
      )}

      <VideoPlayerSplash
        videoSrc="https://res.cloudinary.com/drxzxoqu8/video/upload/v1695158630/overlook.mp4"
        isPlaying={false}
        onReadyCallback={handleOnLoad}
      />
    </div>
  );
}
