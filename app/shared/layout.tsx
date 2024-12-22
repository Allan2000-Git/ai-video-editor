"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useAuthContext } from "@/contexts/auth-context";
import { AppSidebar } from "./(components)/app-sidebar";
import SharedLayoutSkeleton from "./(components)/shared-layout-skeleton";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
    const { isLoading } = useAuthContext();

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
