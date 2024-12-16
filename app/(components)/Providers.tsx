"use client"

import { useUser } from '@clerk/nextjs'
import React, { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner';
import { AuthContext } from '@/contexts/AuthContext';
import { UserResource } from '@clerk/types';

function Providers({children}: {children: ReactNode}) {
    const {user} = useUser();
    const [userDetails, setUserDetails] = useState<UserResource | null | undefined>();

    useEffect(() => {
        const saveUserToDB = async () => {
            const data = await axios.post('/api/users/create', {user});
            if(data.data.success) {
                setUserDetails(user);
                toast.success(data.data.message);
            } else {
                toast.error(data.data.message);
            }
        }

        if(user) {
            saveUserToDB();
        }

    }, [user]);

    return (
        <AuthContext.Provider value={{ userDetails }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Providers