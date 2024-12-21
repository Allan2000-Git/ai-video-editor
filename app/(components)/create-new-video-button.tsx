import React from "react";
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
import { BadgePlus, Brain, Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

const options = [
    {
        title: "Start with AI",
        icon: Brain,
        color: "#007BFF",
        url: '/ai-editor'
    },
    {
        title: "Start from Scratch",
        icon: BadgePlus,
        color: "#28A745",
        url: '/editor'
    }
]

function CreateNewVideoButton() {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button type="button" className="w-full">
                <Plus size={20} />
                Create New Video
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
                    options.map((option) => (
                        <Link
                        key={option.title}
                        href={option.url}
                        className="flex flex-col items-center justify-center gap-4 border rounded-md p-4 hover:shadow-md"
                        >
                            <option.icon size={34} color={option.color} />
                            <span>{option.title}</span>
                        </Link>
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
