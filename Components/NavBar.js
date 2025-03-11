  import Image from "next/image";
  import styles from "../styles/NavBar.module.css"; // Correct import
  import Link from "next/link";
  const NavBar = () => {
    return (
      <div className={styles.navbar}>
        <div className={styles["nav-links"]}>
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
          <div className={styles.links}>
            <ul>
              <Link href="/">
                <li id={styles.home}>Home</li>
              </Link>
              <Link href="/appointment">
                <li id={styles.appointments}>Appointments</li>
              </Link>
              <li id={styles.blog}>Health Blog</li>
              <li id={styles.review}>Reviews</li>
            </ul>
          </div>
        </div>
        <div className={styles["nav-login"]}>
          <Link href="/login">
            <button className={styles.login}>Login</button>
          </Link>
          <Link href="/signup">
            <button className={styles.register}>Register</button>
          </Link>
        </div>
      </div>
    );
  };

  export default NavBar;
