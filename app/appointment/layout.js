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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-gray-100 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Unauthorized. Please log in.
        </h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Go to Home
          </Link>
          <Link
            href="/login"
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    ); 
  }
  return <>{children}</>;
};

export default Layout;
