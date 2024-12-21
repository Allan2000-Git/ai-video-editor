"use client"

import { AppSidebar } from "@/app/(components)/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import SharedLayoutSkeleton from "../(components)/shared-layout-skeleton";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
    const { isLoading } = useContext(AuthContext);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                {
                    !isLoading ?
                    <div className="p-4">
                        {children}
                    </div> :
                    <SharedLayoutSkeleton />
                }
            </main>
        </SidebarProvider>
    )
}
