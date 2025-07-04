"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import dotenv from "dotenv" ;
export const LoginContext = createContext();

dotenv.config() ;
export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const fetchUser = async () => {
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/status`, {
              credentials: "include",
              cache: "no-cache",
              headers: {
                  "Cache-Control": "no-cache, no-store, must-revalidate",
                  Pragma: "no-cache",
              },
          });
          if (res.ok) {
              const userData = await res.json();
              const { id, username, email_id } = userData.user;
              setUser({ user_id: id, user_name: username, user_emailid: email_id });
          } else {
              console.log("Not authenticated, clearing user state");
              setUser(null);
          }
      } catch (error) {
          console.error("Failed to fetch user", error);
          setUser(null);
      } finally {
          setIsLoading(false);
      }
    };  

    const logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            router.push("/");
        } catch (error) {
            console.error("Logout failed. Please try again.");
        }
    };

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return null; 
    }

    return (
        <LoginContext.Provider value={{ user, setUser, fetchUser, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) throw new Error("useLogin must be used within a LoginProvider");
    return context;
};

