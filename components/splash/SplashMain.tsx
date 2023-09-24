"use client";
import { useState } from "react";
import Image from "next/image";
import Foreground from "../../public/splash/overlook foreground.png";
import Background from "../../public/splash/overlook background.png";

export default function SplashMain() {
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);

  function handleOnLoad() {
    // wait half a second before showing the video
    setTimeout(() => {
      console.log("showing video");
      setShowPlaceholder(false);
    }, 500);
  }

  return (
    <div className="absolute top-[80px] left-0 w-full h-full z-0 max-h-full max-w-full">
      <Image
        src={Foreground}
        width={200}
        height={200}
        alt="Incredible overlook of mountains in Hawaii."
        className={`h-full absolute left-0 top-0 w-full object-cover z-10`}
        placeholder="blur"
      />
      <div className=""></div>
      <div className="max-w-h max-w-full h-full w-full overflow-hidden">
        <Image
          src={Background}
          width={200}
          height={200}
          alt="Incredible overlook of mountains in Hawaii."
          className={`h-full animate-splash-rotate animate-splash-filter w-full object-cover`}
          placeholder="blur"
        />
      </div>

      {/* {showPlaceholder && (
        <Image
          src={Picture}
          width={200}
          height={200}
          alt="Incredible overlook of mountains in Hawaii."
          className={`h-full absolute left-0 top-0 w-full object-cover`}
          placeholder="blur"
        />
      )}

      <VideoPlayerSplash
        videoSrc="https://res.cloudinary.com/drxzxoqu8/video/upload/v1695158630/overlook.mp4"
        isPlaying={false}
        onReadyCallback={handleOnLoad}
      /> */}
    </div>
  );
}
