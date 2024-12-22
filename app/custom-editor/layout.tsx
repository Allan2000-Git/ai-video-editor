"use client"

import { useAuthContext } from "@/contexts/auth-context";

export default function CustomEditorLayout({ children }: { children: React.ReactNode }) {
    const { isLoading } = useAuthContext();

    if(isLoading) {
        return (
            <main className="w-full h-full container m-auto py-10 overflow-auto">
                Loading editor...
            </main>
        )
    }

    return (
        <main className="w-full h-full container m-auto py-10 overflow-auto">
            {children}
        </main>
    )
}
