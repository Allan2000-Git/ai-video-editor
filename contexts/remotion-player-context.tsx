"use client"

import { defaultFrame } from "@/app/custom-editor/(components)/frames-list";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface RemotionPlayerType {
    videoFrames: VideoFramesType;
    setVideoFrames: Dispatch<SetStateAction<VideoFramesType>>
}

interface VideoFramesType {
  frames: any[];
  totalDuration: number;
  selectedFrame: number;
}

export const RemotionPlayerContext = createContext<RemotionPlayerType | undefined>(undefined);

export function RemotionPlayerContextProvider({children}: {children: React.ReactNode}) {
    const [videoFrames, setVideoFrames] = useState<VideoFramesType>({
      frames: [defaultFrame],
      totalDuration: 2,
      selectedFrame: 0
    });

    return (
      //giving access globally
      <RemotionPlayerContext.Provider value={{videoFrames, setVideoFrames}}>
        {children}
      </RemotionPlayerContext.Provider>
    )
  }

export const useRemotionPlayerContext = () =>{
  const context = useContext(RemotionPlayerContext);
  if (context === undefined) {
    throw new Error("useRemotionPlayerContext must be used within an RemotionPlayerContextProvider");
  }
  return context;
}