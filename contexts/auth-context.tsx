"use client"

import { User } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import axios, { AxiosResponse } from "axios";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthContextType {
    userDetails: User | null;
    setUserDetails: Dispatch<SetStateAction<User | null>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({children}: {children: React.ReactNode}) {
  const [userDetails, setUserDetails] = useState(() => {
    if (typeof window !== 'undefined') {
        const storedUserDetails = sessionStorage.getItem('userDetails');
        return storedUserDetails ? JSON.parse(storedUserDetails) : null;
    }
    return null;
  });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {user} = useUser();

    useEffect(() => {
      const saveUserToDB = async () => {
          setIsLoading(true);
          try {
              const data: AxiosResponse = await axios.post('/api/users/create', {user});
              if(data.data.success) {
                  setUserDetails(data.data.data);
                  sessionStorage.setItem('userDetails', JSON.stringify(data.data.data));
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
    }, [user]);

    useEffect(() => {
      if (userDetails) {
          sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
      }
    }, [userDetails]);

    return (
      //giving access globally
      <AuthContext.Provider value={{userDetails, setUserDetails, isLoading, setIsLoading}}>
        {children}
      </AuthContext.Provider>
    )
  }

export const useAuthContext = () =>{
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
}