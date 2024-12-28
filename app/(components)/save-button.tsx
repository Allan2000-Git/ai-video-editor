"use client"

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth-context';
import { useRemotionPlayerContext } from '@/contexts/remotion-player-context';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface SaveButtonProps {
    videoId: number;
}

function SaveButton({videoId}: SaveButtonProps) {
    const {userDetails} = useAuthContext();
    const {videoFrames} = useRemotionPlayerContext();
    const [isPending, setIsPending] = useState<boolean>(false);

    const saveVideo = async () => {
        setIsPending(true);
        try {
            const data = await axios.patch('/api/video', {
                videoId,
                userDetails,
                videoData: videoFrames
            });
            if(data.data.success) {
                toast.success(data.data.message);
            } else {
                toast.error(data.data.message);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong while saving.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Button
        disabled={isPending}
        className='flex items-center gap-2'
        onClick={saveVideo}
        >
            {isPending && <LoaderCircle size={18} className="animate-spin" />}
            {isPending ? "Saving" : "Save"}
        </Button>
    )
}

export default SaveButton