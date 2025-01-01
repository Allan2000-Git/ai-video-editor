"use client"

import {Player} from '@remotion/player';
import { RemotionComposition } from './remotion-composition';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useRef, useState } from 'react';
import { Fullscreen } from 'lucide-react';
import { FRAMES_PER_SECOND } from '@/lib/constants';
import { useRemotionPlayerContext } from '@/contexts/remotion-player-context';

const aspectRatioOptions = [
    { label: "16:9", value: { width: 500, height: Math.round(300 * 9 / 16) } }, // Landscape
    { label: "1:1", value: { width: 500, height: 300 } }, // Square
    { label: "21:9", value: { width: 500, height: Math.round(300 * 9 / 21) } }, // Ultra-wide
    { label: "9:16", value: { width: 500, height: Math.round(300 * 16 / 9) } }, // Portrait (Mobile-like)
    { label: "2:1", value: { width: 500, height: Math.round(300 / 2) } }, // Banner-like
    { label: "16:10", value: { width: 500, height: Math.round(300 * 10 / 16) } }, // Balanced landscape
    { label: "18:9", value: { width: 500, height: Math.round(300 * 9 / 18) } }, // Narrower landscape
];

export const RemotionPlayer: React.FC = () => {
    const {videoFrames} = useRemotionPlayerContext();
    const videoPlayerRef = useRef<any>(null);
    const [selectedAspectRatio, setSelectedAspectRatio] = useState<{width: number, height: number}>({width: 500, height: 500});

    const handleAspectRatioChange = (newValue: { width: number; height: number }) => {
        setSelectedAspectRatio(newValue);
    };

    useEffect(() => {
        if (videoPlayerRef.current) {
            let durationToSkip = 0;
            for (let index = 0; index < videoFrames.selectedFrame; index++) {
                const currentFrame = videoFrames.frames[index];
                durationToSkip += (currentFrame.duration * FRAMES_PER_SECOND);
            }

            videoPlayerRef.current.seekTo(durationToSkip);
        }
    }, [videoFrames.selectedFrame]);

    return (
        <div>
            <div className="w-full p-4 flex items-center justify-center border rounded-md">
                {
                    videoFrames.totalDuration &&
                    <Player
                    ref={videoPlayerRef}
                    component={RemotionComposition}
                    durationInFrames={videoFrames.totalDuration * FRAMES_PER_SECOND}
                    compositionWidth={selectedAspectRatio.width}
                    compositionHeight={selectedAspectRatio.height}
                    fps={FRAMES_PER_SECOND}
                    controls
                    />
                }
            </div>
            <div className="mt-5 flex items-center gap-5">
                <Fullscreen />
                <Select onValueChange={(value) => {
                    const selectedOption = aspectRatioOptions.find(option => option.label === value);
                    if (selectedOption) {
                        handleAspectRatioChange(selectedOption.value);
                    }
                }} defaultValue='1:1'>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            aspectRatioOptions.map((option) => (
                                <SelectItem key={option.label} value={option.label}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>

            </div>
        </div>
    );
};