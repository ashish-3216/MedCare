"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        alert("Logout successful!");
        setIsMenuOpen(false); // Close menu on logoutW
        router.replace("/login");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to close menu when a link is clicked
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

          {/* Move login/register inside nav-links for mobile */}
          <div className={styles["mobile-nav-login"]}>
            <Link href="/login" onClick={closeMenu}>
              <button className={styles.login}>Login</button>
            </Link>
            <Link href="/signup" onClick={closeMenu}>
              <button className={styles.register}>Register</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop login/register buttons */}
      <div className={styles["nav-login"]}>
        <Link href="/login">
          <button className={styles.login}>Login</button>
        </Link>
        <Link href="/signup">
          <button className={styles.register}>Register</button>
        </Link>
        <>
          <button className={styles.login} onClick={handleLogout}>
            Logout
          </button>
        </>
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

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import styles from "@/styles/NavBar.module.css";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import useAuth from "./useAuthHook";
// const NavBar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       if (res.ok) {
//         alert("Logout successful!");
//         setIsMenuOpen(false); // Close menu on logoutW
//         router.replace("/login");
//       } else {
//         alert("Logout failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   // useEffect(() => {
//   //   if (!isAuthenticated) {
//   //     refreshAuth();
//   //   }
//   // }, [isAuthenticated]);

//   return (
//     <div className={styles.navbar}>
//       <div className={styles.leftDiv}>
//         <div className={styles.logo}>
//           <div className={styles.Frame}>
//             <Image
//               className={styles.trust}
//               src="/medcare_logo.png"
//               width={20}
//               height={20}
//               alt="Logo"
//             />
//           </div>
//           <div className={styles.name}>
//             <p>MedCare</p>
//           </div>
//         </div>

//         <div
//           className={`${styles["nav-links"]} ${
//             isMenuOpen ? styles.active : ""
//           }`}
//         >
//           <div className={styles.links}>
//             <ul>
//               <Link href="/" onClick={closeMenu}>
//                 <li id={styles.home}>Home</li>
//               </Link>
//               <Link href={ '/appointment'} onClick={closeMenu}>
//                 <li id={styles.appointments}>Appointments</li>
//               </Link>
//               <li id={styles.blog} onClick={closeMenu}>
//                 Health Blog
//               </li>
//               <li id={styles.review} onClick={closeMenu}>
//                 Reviews
//               </li>
//             </ul>
//           </div>

//           {/* Show login/register or logout based on isLoggedIn */}
//           <div className={styles["mobile-nav-login"]}>

//               <>
//                 <Link href="/login" onClick={closeMenu}>
//                   <button className={styles.login}>Login</button>
//                 </Link>
//                 <Link href="/signup" onClick={closeMenu}>
//                   <button className={styles.register}>Register</button>
//                 </Link>
//               </>

//               <>
//                 <button className={styles.logout} onClick={handleLogout}>
//                   Logout
//                 </button>
//               </>

//           </div>
//         </div>
//       </div>

//       {/* Desktop login/register buttons */}
//       <div className={styles["nav-login"]}>

//           <>
//             <Link href="/login">
//               <button className={styles.login}>Login</button>
//             </Link>
//             <Link href="/signup">
//               <button className={styles.register}>Register</button>
//             </Link>
//           </>
//           <>

//           </>

//       </div>

//       <div className={styles.hamburger} onClick={toggleMenu}>
//         <Image
//           className={styles["menu-img"]}
//           src={isMenuOpen ? "/close.png" : "/burger-bar.png"}
//           alt="Hamburger-Menu"
//           width={30}
//           height={30}
//         />
//       </div>
//     </div>
//   );
// };

// export default NavBar;
