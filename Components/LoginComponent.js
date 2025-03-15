import React from "react";
import styles from "../styles/LoginPage.module.css";
import Image from "next/image";
import Input_component from "./Input_component";
import Button_component from "./Button_component";
import Link from "next/link";
const LoginComponent = () => {
  return (
    <div className={styles.login}>
      <Image src={'./login.svg'} layout="fill" alt="login" height={0} width={0} className={styles.login_image}/>
      <div className={styles.fields}>
        <h6>Login</h6>
        <p id={styles.signup_route}>
          Are you a new member?
          <span>
            <Link href="/signup">Sign up here.</Link>
          </span>
        </p>
        <section className={styles.login_section}>
          <Input_component
            LabelName="Email"
            color="rgba(28, 74, 42, 1)"
            input_type="email"
            img_url="./At sign.png"
            placeholder_name="example@123.com"
          />
          <Input_component
            LabelName="Password"
            color="rgba(28, 74, 42, 1)"
            input_type="password"
            img_url="./Lock.svg"
            placeholder_name="Enter Your Password"
            isPasswordFlag = {true} 
          />
          <Button_component text="Login" color="#1C4A2A" />
          <Button_component text="Reset" color="#C6B09A" />
          <a href="#"><p className={styles.forgot}>Forgot Password ?</p></a>
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
