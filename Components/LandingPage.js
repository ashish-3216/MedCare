"use client"
import Image from "next/image";
import styles from "../styles/landingpage.module.css";
import Link from "next/link";
import { useLogin } from "@/context/LoggedInContext";
export default function LandingPage() {
  const {user} = useLogin();
  return (
    <div className={styles.container}>
      {/* left */}
      <div className={styles["landing-text"]}>
        {/* text content */}
        <div>
          <h2>Health in Your Hands.</h2>
          <p>
            Take control of your healthcare with CareMate. Book appointments
            with ease, explore health blogs, and stay on top of your well-being,
            all in one place.
          </p>
        </div>
        {/* button  */}
        <Link href={user ? '/appointment' : '/login'}>
          <button className={styles.startbtn}>Get Started</button>
        </Link>
      </div>
      {/* right */}
      <div className={styles.right}>
        <Image
        src={'./homeImage.svg'}
        alt="landing image"
        fill
        className={styles.landing_img}
        />
      </div>
    </div>
  );
}
