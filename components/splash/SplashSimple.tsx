"use client";
import { useState } from "react";
import Image from "next/image";
import Foreground from "../../public/splash/overlook foreground.png";
import Background from "../../public/splash/overlook background.png";
import Upper from "../../public/splash/upper.png";

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
    <div className="absolute top-[80px] left-0 w-full h-[93vh] z-0 bg-sky-400 max-h-full max-w-full">
      <Image
        src={Upper}
        width={200}
        height={200}
        alt="Head peeping out"
        className={`h-92 w-92 absolute mx-auto bottom-0  object-cover z-10`}
        placeholder="blur"
      />
    </div>
  );
}
