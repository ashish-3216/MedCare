"use client";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/status", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
