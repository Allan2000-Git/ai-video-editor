import { User } from "@/db/schema";
import { createContext } from "react";
interface AuthContextType {
    userDetails: User | null;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({ userDetails: null, isLoading: false });