"use client"

import { useUser } from '@clerk/nextjs'
import React, { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner';
import { AuthContext } from '@/contexts/AuthContext';
import { User } from '@/db/schema';
import { ThemeProvider } from './theme-provider';
import { useTheme } from 'next-themes';

function Providers({children}: {children: ReactNode}) {
    const {user} = useUser();
    const { setTheme } = useTheme();
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const saveUserToDB = async () => {
            setIsLoading(true);
            try {
                const data = await axios.post('/api/users/create', {user});
                if(data.data.success) {
                    setUserDetails(data.data.data);
                } else {
                    toast.error(data.data.message);
                }
            } catch (error: any) {
                toast.error(error.response?.data?.message || error.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        }

        if (user && !userDetails) {
            saveUserToDB();
        }

        setTheme("dark")

    }, [user, userDetails, setTheme]);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthContext.Provider value={{ userDetails, isLoading }}>
                {children}
            </AuthContext.Provider>
        </ThemeProvider>
    )
}

export default Providers