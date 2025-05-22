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
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-8">
        Unauthorized. Please log in.
      </h1>

      <div className="flex flex-wrap gap-6">
  <Link
    href="/"
    className="flex items-center justify-center text-lg rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 w-[200px] h-[50px]"
  >
    Go to Home
  </Link>
  <Link
    href="/login"
    className="flex items-center justify-center text-lg rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-200 w-[200px] h-[50px]"
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
