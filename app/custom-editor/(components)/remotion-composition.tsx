import { useRemotionPlayerContext } from "@/contexts/remotion-player-context";
import { FRAMES_PER_SECOND } from "@/lib/constants";
import { AbsoluteFill, OffthreadVideo, Sequence } from "remotion";

export const RemotionComposition = () => {
    const {videoFrames} = useRemotionPlayerContext();
    let durationByFrame = 0;

    return (
        <div className="w-full">
            <AbsoluteFill className="bg-white">
                {
                    videoFrames.frames.map((frame, index) => {
                        const fromDuration = index === 0 ? 0 : durationByFrame
                        durationByFrame += (frame.duration * FRAMES_PER_SECOND);

                        return (
                            <Sequence
                            key={index}
                            from={fromDuration}
                            durationInFrames={frame.duration * FRAMES_PER_SECOND}>
                                <h1 className="text-black">{frame.name}</h1>
                            </Sequence>
                        )
                    })
                }
            </AbsoluteFill>
        </div>
    )
};