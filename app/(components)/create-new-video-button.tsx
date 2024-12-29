"use client"

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BadgePlus, Brain, LoaderCircle, Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuthContext } from "@/contexts/auth-context";
import { VideoTypeValues } from "@/db/schema";

const options = [
    {
        id: 1,
        title: "Start with AI",
        icon: Brain,
        color: "#007BFF",
        url: '/ai-editor',
        type: 'AI'
    },
    {
        id: 2,
        title: "Start from Scratch",
        icon: BadgePlus,
        color: "#28A745",
        url: '/custom-editor',
        type: 'CUSTOM'
    }
]

function CreateNewVideoButton() {
    const router = useRouter();
    const {state} = useSidebar();
    const {userDetails} = useAuthContext();
    const [isPending, setIsPending] = useState<boolean>(false);

    const createCustomVideo = async (type: string) => {
        setIsPending(true);
        try {
            const data = await axios.post('/api/video', {type, userDetails});
            if(data.data.success) {
                router.push(`/custom-editor/${data.data.data}`);
            } else {
                toast.error(data.data.message);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button type="button" className="w-full">
                <Plus size={20} />
                {state === "expanded" && <>Create New Video</>}
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Get Started with Your Video Creation</DialogTitle>
            <DialogDescription>
                Choose how you want to begin your video creation journey. Let AI
                assist you or take full control with a blank canvas.
            </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-3">
                {
                    options.map((option, index) => (
                        <Button
                        type="button"
                        variant={"link"}
                        key={option.title}
                        disabled={isPending}
                        onClick={() => createCustomVideo(option.type)}
                        className="h-max text-base flex flex-col items-center justify-center gap-4 border rounded-md p-4 hover:shadow-md hover:no-underline"
                        >
                            <option.icon size={34} color={option.color} />
                            <div className="flex items-center gap-2">
                                {isPending && option.type === VideoTypeValues[0] && <LoaderCircle size={18} className="animate-spin" />}
                                <span>{option.title}</span>
                            </div>
                        </Button>
                    ))
                }
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}

export default CreateNewVideoButton;
