'use client'
import React, { useState } from "react";
import Image from "next/image";
import InputComponent from "@/Components/Input_component";
import Button_component from "@/Components/Button_component";
import styles from "@/styles/signup.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const LoginComponent = () => {
  const [userName, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const router = useRouter() ;
  const postData = async ()=> {
    const data = {
      username: userName,
      email : email ,
      password: password,
    };

    const response = await fetch("http://localhost:5000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.success) {
      toast.success("User registered successfully!");
      setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 1500); 
      // console.log("Success:", result);
      // router.push('/login');
      // window.location.href = result.redirectUrl; // Perform client-side redirect
    } else {
      toast.error("Error:", result.message);
    }
  }

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
            setValue={setUsername}
          />
          <InputComponent
            LabelName="Email"
            color="rgba(28, 74, 42, 1)"
            input_type="email"
            img_url="./At sign.png"
            placeholder_name="example@123.com"
            setValue={setemail}
          />
          <InputComponent
            LabelName="Password"
            color="rgba(28, 74, 42, 1)"
            input_type="password"
            img_url="./Lock.svg"
            placeholder_name="Enter Your Password"
            isPasswordFlag={true}
            setValue={setpassword}
          />
          <Button_component text="Login" color="#1C4A2A" onClick={() => postData()} />
          <Button_component text="Reset" color="#C6B09A" />
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
