import { getCurrentUser } from "@/lib/appwrite/apiCalls";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export type User = {
    username: string;
    email: string;
    id: string;
    profileImageUrl: string;
  };

export const INITIAL_USER = {
    username: "",
    email: "",
    id: "",
    profileImageUrl: "",
  };


  const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
  };

  type IContextType = {
    user: User;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
  };

  const AuthContext = createContext<IContextType>(INITIAL_STATE);

  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const checkAuthUser = async () => {
      setIsLoading(true);
      try {
        const currentAccount = await getCurrentUser();
        if (currentAccount) {
          setUser({
              username: currentAccount.username,
              email: currentAccount.email,
              id: currentAccount.$id,
              profileImageUrl: currentAccount.profileImageUrl
          });
          setIsAuthenticated(true);
  
          return true;
        }
  
        return false;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      const cookieFallback = localStorage.getItem("cookieFallback");
      if (
        cookieFallback === "[]" || cookieFallback === null || cookieFallback === undefined
      ) {
        navigate("/sign-in");
      }
  
      checkAuthUser();
    }, []);
  
    const value = {
      user,
      setUser,
      isLoading,
      isAuthenticated,
      setIsAuthenticated,
      checkAuthUser,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
  
  export const useUserContext = () => useContext(AuthContext);