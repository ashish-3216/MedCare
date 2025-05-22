"use client";
import { useState, useEffect } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/context/LoggedInContext";
import { usePathname } from "next/navigation";
import LoadingBar from "@/Components/LoadingBar";

// import ChangeThemeButton from '@/Components/ChangeThemeButton';
import { UserCircle, ChevronDown } from "lucide-react";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    const [Loading, isLoading] = useState(false);
  
  const { user, logout, fetchUser } = useLogin();

  const pathname = usePathname();
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      isLoading(true);
      await logout();
      setIsMenuOpen(false); // Close menu on logout
      router.replace("/login");
      isLoading(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

        if(Loading)
          return (
              <div className="flex justify-center items-center min-h-[70vh]">
                <div className="w-1/2 max-w-md">
                  <LoadingBar value={33}/>
                </div>
            </div>
      
          );
    

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
                <li id={pathname === "/" ? styles.activeLink : styles.home}>
                  Home
                </li>
              </Link>

              <Link href="/appointment" onClick={closeMenu}>
                <li
                  id={
                    pathname === "/appointment"
                      ? styles.activeLink
                      : styles.appointments
                  }
                >
                  Appointments
                </li>
              </Link>
              <Link href="/emergency">
              <li id={
                    pathname === "/emergency"
                      ? styles.activeLink
                      : styles.blog
                  } onClick={closeMenu}>
                Health Blog
              </li>
              </Link>
              <Link href={'/review'}>
              <li id={
                    pathname === "/review"
                      ? styles.activeLink
                      : styles.review
                  } onClick={closeMenu}>
                Reviews
              </li>
              </Link>
            </ul>
          </div>

          <div className={styles["mobile-nav-login"]}>
          {user ? (
          <>
            <Link href={"/profile"}>
              <button className={styles.register} >Profile</button>
            </Link>
            <button className={styles.login} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className={styles.login}>Login</button>
            </Link>
            <Link href="/signup">
              <button className={styles.register}>Register</button>
            </Link>
          </>
        )}
          </div>
        </div>
      </div>

      <div className={styles["nav-login"]}>
        {/* <ChangeThemeButton/> */}
        {user ? (
          <>
            <Link href={"/profile"}>
              <PiUserCircleDuotone className={styles.profile} size={65} />
            </Link>
            <button className={styles.login} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            
            <Link href="/login">
              <button className={styles.login}>Login</button>
            </Link>
            <Link href="/signup">
              <button className={styles.register}>Register</button>
            </Link>
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
