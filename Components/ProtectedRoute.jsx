// "use client";
// import { useRouter, usePathname } from "next/navigation";
// import useAuth from "@/Components/useAuthHook";
// import { useEffect } from "react";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (loading) return; // Prevent redirection while loading

//     // Redirect to login if not authenticated and not on login/signup
//     // if (!isAuthenticated) {
//     //     console.log('in 1st')
//     //     console.log('authenticated',isAuthenticated)
//     //     console.log('pathname',pathname.includes(["/login", "/signup"]))
//     //   router.replace("/login"); // Use replace to prevent going back to this page
//     // }

//     // // Redirect authenticated users away from login/signup
//     // if (isAuthenticated && pathname.includes(["/login", "/signup"])) {
//     //     console.log('in 2nd')
//     //     console.log('authenticated',isAuthenticated)
//     //     console.log('pathname',pathname.includes(["/login", "/signup"]))
//     //   router.replace("/appointment"); // Adjust to your dashboard or preferred page
//     // }
//     if((['/login','/signup']).includes(pathname)){
//         if(isAuthenticated){
//             router.replace('/appointment')
//         }
//     }
//     if(!isAuthenticated){
//         console.log('is authenticated',isAuthenticated)
//         console.log('inside 2nd')
//         console.log(!(['/login','/signup']).includes(pathname))
//         if(!['/login','/signup'].includes(pathname)){
//             router.replace('/login')
//         }
//     }
//   }, [isAuthenticated, loading, pathname, router]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return children;
// };

// export default ProtectedRoute;



"use client";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/Components/useAuthHook";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Prevent redirection while loading

    const isAuthPage = ["/login", "/signup"].includes(pathname);
    console.log(isAuthenticated);
    if (!isAuthenticated && !isAuthPage) {
      console.log("Redirecting to login: Unauthorized");
      router.replace("/login");
    } else if (isAuthenticated && isAuthPage) {
      console.log("Redirecting to appointments: Already authenticated");
      router.replace("/appointment");
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
};

export default ProtectedRoute;