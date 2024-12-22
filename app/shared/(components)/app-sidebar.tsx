"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { LayoutDashboard, CreditCard, Settings, Command } from "lucide-react"
import Link from "next/link"
import NavUser from "./nav-user"
import { useContext } from "react"
import { AuthContext, useAuthContext } from "@/contexts/auth-context"
import { SidebarCreditsUsedProgress } from "./sidebar-credits-used-progress"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import CreateNewVideoButton from "@/app/(components)/create-new-video-button"

// Menu items.
const data = {
    navItems: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Purchase Credits",
            url: "/purchase-credits",
            icon: CreditCard,
        },
        {
            title: "Account Settings",
            url: "/account-settings",
            icon: Settings,
        },
    ]
}

export function AppSidebar() {
    const pathName = usePathname();
    const { isLoading, userDetails } = useAuthContext();
    const {state} = useSidebar();

    if (isLoading) {
        return (
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu className="max-w-max">
                        <div className="my-4">
                            <SidebarMenuItem
                            className="max-w-max"
                            >
                                <SidebarMenuSkeleton
                                showIcon
                                className="h-8"
                                />
                            </SidebarMenuItem>
                        </div>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <SidebarMenuItem
                                    key={index}
                                    className="max-w-max"
                                    >
                                        <SidebarMenuSkeleton showIcon />
                                    </SidebarMenuItem>
                                ))
                            }
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    {
                        Array.from({ length: 2 }).map((_, index) => (
                            <SidebarMenuItem
                            key={index}
                            className="max-w-max"
                            >
                                <SidebarMenuSkeleton showIcon />
                            </SidebarMenuItem>
                        ))
                    }
                </SidebarFooter>
            </Sidebar>
        )
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={'/'}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Acme Inc</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <CreateNewVideoButton />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {
                        data.navItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                asChild
                                className={cn("h-10", {
                                    "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary": item.url === pathName
                                })}
                                >
                                    <Link className="text-[16px]" href={item.url}>
                                        <item.icon size={20} />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    }
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {
                    state === "expanded" && <SidebarCreditsUsedProgress user={userDetails} />
                }
                <NavUser user={userDetails} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}