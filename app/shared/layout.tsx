"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { AppSidebar } from "./(components)/app-sidebar";
import SharedLayoutSkeleton from "./(components)/shared-layout-skeleton";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
    const { isLoading } = useContext(AuthContext);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full relative">
                <SidebarTrigger className="absolute" />
                {
                    !isLoading ?
                    <div className="p-4 h-full">
                        {children}
                    </div> :
                    <div className="p-4 h-full mt-5">
                        <SharedLayoutSkeleton />
                    </div>
                }
            </main>
        </SidebarProvider>
    )
}
