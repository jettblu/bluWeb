"use client";

import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
  videoSrc: string;
  isPlaying: boolean;
}

export default function BluVideo({ videoSrc, isPlaying }: Props) {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    setPlayerReady(false);
  }, [videoSrc]);

  const handleReady = useCallback(() => {
    setPlayerReady(true);
  }, []);

  return (
    <div className="mx-auto aspect-video w-full max-w-full overflow-hidden rounded-md">
      <ReactPlayer
        url={videoSrc}
        playing={isPlaying && playerReady}
        controls
        width="100%"
        height="100%"
        onReady={handleReady}
      />
    </div>
  );
}
