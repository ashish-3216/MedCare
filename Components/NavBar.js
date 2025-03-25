// 'use client'
// import { useState } from "react";
// import Image from "next/image";
// import styles from "../styles/NavBar.module.css";
// import Link from "next/link";

// const NavBar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Function to close menu when a link is clicked
//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <div className={styles.navbar}>
//       <div className={styles.leftDiv}>
//       <div className={styles.logo}>
//         <div className={styles.Frame}>
//           <Image
//             className={styles.trust}
//             src="/medcare_logo.png"
//             width={20}
//             height={20}
//             alt="Logo"
//           />
//         </div>
//         <div className={styles.name}>
//           <p>MedCare</p>
//         </div>
//       </div>

//       <div className={`${styles["nav-links"]} ${isMenuOpen ? styles.active : ""}`}>
//         <div className={styles.links}>
//           <ul>
//             <Link href="/" onClick={closeMenu}>
//               <li id={styles.home}>Home</li>
//             </Link>
//             <Link href="/appointment" onClick={closeMenu}>
//               <li id={styles.appointments}>Appointments</li>
//             </Link>
//             <li id={styles.blog} onClick={closeMenu}>Health Blog</li>
//             <li id={styles.review} onClick={closeMenu}>Reviews</li>
//           </ul>
//         </div>

//         {/* Move login/register inside nav-links for mobile */}
//         <div className={styles["mobile-nav-login"]}>
//           <Link href="/login" onClick={closeMenu}>
//             <button className={styles.login}>Login</button>
//           </Link>
//           <Link href="/signup" onClick={closeMenu}>
//             <button className={styles.register}>Register</button>
//           </Link>
//         </div>
//       </div>
//       </div>

//       {/* Desktop login/register buttons */}
//       <div className={styles["nav-login"]}>
//         <Link href="/login">
//           <button className={styles.login}>Login</button>
//         </Link>
//         <Link href="/signup">
//           <button className={styles.register}>Register</button>
//         </Link>
//       </div>

//       <div className={styles.hamburger} onClick={toggleMenu}>
//         <Image
//           className={styles["menu-img"]}
//           src={isMenuOpen ? '/close.png' : '/burger-bar.png'}
//           alt="Hamburger-Menu"
//           width={30}
//           height={30}
//         />
//       </div>
//     </div>

//   );
// };

// export default NavBar;

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/status",{
          method: "GET",
          credentials: "include",
        });
  
        // if (!response.ok) throw new Error("Unauthorized");
        if (!response.ok) {
          setIsAuthenticated(false);
          return;
        }
  
  
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, [pathname]);
   // Run on route change

   const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "get",
         credentials:"include"// Ensures session cookie is sent for logout
      });

      setIsAuthenticated(false);
      router.push("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.leftDiv}>
        <div className={styles.logo}>
          <div className={styles.Frame}>
            <Image
              className={styles.trust}
              src="/medcare_logo.png"
              width={20}
              height={20}
              alt="Logo"
            />
          </div>
          <div className={styles.name}>
            <p>MedCare</p>
          </div>
        </div>

        <div
          className={`${styles["nav-links"]} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <div className={styles.links}>
            <ul>
              <Link href="/" onClick={closeMenu}>
                <li id={styles.home}>Home</li>
              </Link>
              <Link href="/appointment" onClick={closeMenu}>
                <li id={styles.appointments}>Appointments</li>
              </Link>
              <li id={styles.blog} onClick={closeMenu}>
                Health Blog
              </li>
              <li id={styles.review} onClick={closeMenu}>
                Reviews
              </li>
            </ul>
          </div>

          {/* Show login/register or logout based on isLoggedIn */}
          <div className={styles["mobile-nav-login"]}>
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={closeMenu}>
                  <button className={styles.login}>Login</button>
                </Link>
                <Link href="/signup" onClick={closeMenu}>
                  <button className={styles.register}>Register</button>
                </Link>
              </>
            ) : (
              <>
                <button className={styles.logout} onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop login/register buttons */}
      <div className={styles["nav-login"]}>
        {!isAuthenticated ? (
          <>
            <Link href="/login">
              <button className={styles.login}>Login</button>
            </Link>
            <Link href="/signup">
              <button className={styles.register}>Register</button>
            </Link>
          </>
        ) : (
          <>
            <button className={styles.login} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <Image
          className={styles["menu-img"]}
          src={isMenuOpen ? "/close.png" : "/burger-bar.png"}
          alt="Hamburger-Menu"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default NavBar;
