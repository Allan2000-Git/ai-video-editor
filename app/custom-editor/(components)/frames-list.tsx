"use client"

import { Button } from '@/components/ui/button';
import { useRemotionPlayerContext } from '@/contexts/remotion-player-context';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react'

const defaultFrame = {
    image: '/frame-placeholder.webp',
    name: 'Frame 1',
    color: '#000',
    fontSize: '16px',
    duration: 5
}

function FramesList() {
    const [selectedFrame, setSelectedFrame] = useState(0);
    const [frames, setFrames] = useState([defaultFrame, defaultFrame]);
    const {setVideoFrames} = useRemotionPlayerContext();

    const handleAddNewFrame = () => {
        setFrames([...frames, defaultFrame]);
    }

    const handleDeleteFrame = (event: Event, frameIndex: number) => {
        event.stopPropagation();
        const updatedFrames = frames.filter((_, index) => index !== frameIndex);
        setFrames(updatedFrames);
    }

    useEffect(() => {
        let totalDuration = 0;

        totalDuration = frames.reduce((acc, currentFrame) => {
            return acc + currentFrame.duration
        }, 0);

        setVideoFrames({
            frames,
            totalDuration,
            selectedFrame
        })

    }, [frames, selectedFrame]);

    return (
        <>
            <div className="relative w-full flex flex-col rounded-md overflow-hidden">
                <div className="h-[calc(100vh-175px)] flex flex-col gap-5 py-4 px-6 bg-muted/25 overflow-y-auto scrollbar-hide">
                    {
                        frames.map((frame, index) => (
                            <Fragment key={index}>
                                <div
                                className={cn('p-2 flex flex-col items-center gap-3 cursor-pointer rounded-md',{
                                    'bg-white shadow-md text-primary-foreground': selectedFrame === index
                                })}
                                onClick={() => setSelectedFrame(index)}
                                >
                                    <Image
                                    src={frame.image}
                                    alt={frame.name}
                                    width={125}
                                    height={125}
                                    className='object-cover rounded-md'
                                    />
                                    <p className="line-clamp-2">{frame.name}</p>
                                    {
                                        selectedFrame === index &&
                                        <div>
                                            <Trash2
                                            size={18}
                                            className="text-destructive"
                                            onClick={(e: any) => handleDeleteFrame(e, index)}
                                            />
                                        </div>
                                    }
                                </div>
                                {
                                    index !== frames.length - 1 &&
                                    <div className="w-3/4 h-[1px] mx-auto bg-muted-foreground/50 rounded-full"></div>
                                }
                            </Fragment>
                        ))
                    }
                </div>
                <div className="sticky bottom-0 flex justify-center bg-muted/75 z-50 py-4">
                    <Button onClick={handleAddNewFrame}>Add New Frame</Button>
                </div>
            </div>
        </>
    )
}

export default FramesList