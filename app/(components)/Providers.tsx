"use client"

import React, { ReactNode, useEffect } from 'react'
import { AuthContextProvider } from '@/contexts/auth-context';
import { ThemeProvider } from './theme-provider';
import { useTheme } from 'next-themes';
import { RemotionPlayerContextProvider } from '@/contexts/remotion-player-context';

function Providers({children}: {children: ReactNode}) {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("dark")
    }, [setTheme]);

    return (
        <AuthContextProvider>
            <RemotionPlayerContextProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                        {children}
                </ThemeProvider>
            </RemotionPlayerContextProvider>
        </AuthContextProvider>
    )
}

export default Providers