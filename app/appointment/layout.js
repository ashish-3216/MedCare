"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/context/LoggedInContext";
import Link from "next/link";
const Layout = ({ children }) => {
  const { user, fetchUser } = useLogin();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);
  if (!user) {
    return(
        <>
            <h1>Unathourized.Please Log in.</h1>;
            <Link href='/'>Go to Home</Link>
            <Link href='/login'>Login</Link>
        </>
    ) 
  }
  return <>{children}</>;
};

export default Layout;
