import React from "react";
import Image from "next/image";
import InputComponent from "@/Components/Input_component";
import Button_component from "@/Components/Button_component";
import styles from "@/styles/signup.module.css"
import Link from "next/link";
const LoginComponent = () => {
  return (
    <div className={styles.signup}>
      <Image
        src={"./login.svg"}
        layout="fill"
        alt="login"
        height={0}
        width={0}
        className={styles.back_image}
      />
      <div className={styles.signup_fields}>
        <h6>Sign Up</h6>
        <p id={styles.signup_route}>
          Already a member?
          <span>
            <Link href="/login">Login.</Link>
          </span>
        </p>
        <section className={styles.signup_section}>
        <InputComponent
            LabelName="Name"
            color="rgba(28, 74, 42, 1)"
            input_type="text"
            img_url="./name.svg"
            placeholder_name="Enter Your Name"
          />
          <InputComponent
            LabelName="Email"
            color="rgba(28, 74, 42, 1)"
            input_type="email"
            img_url="./At sign.png"
            placeholder_name="example@123.com"
          />
          <InputComponent
            LabelName="Password"
            color="rgba(28, 74, 42, 1)"
            input_type="password"
            img_url="./Lock.svg"
            placeholder_name="Enter Your Password"
            isPasswordFlag = {true}
          />
          <Button_component text="Login" color="#1C4A2A" />
          <Button_component text="Reset" color="#C6B09A" />
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
