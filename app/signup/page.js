"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import InputComponent from "@/Components/Input_component";
import Button_component from "@/Components/Button_component";
import styles from "@/styles/signup.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useLogin } from "@/context/LoggedInContext";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "@/Components/LoadingBar";

const LoginComponent = () => {
  const [userName, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { user } = useLogin();
  const router = useRouter();
  const [Loading, isLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  if (user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        Already Logged in, redirecting back to home page!
      </div>
    );
  }

  const capitalizeName = (name) => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const postData = async () => {
    const data = {
      username: capitalizeName(userName),
      email: email,
      password: password,
    };

    if (!(email.endsWith("@gmail.com") || email.endsWith("@tothenew.com"))) {
      return toast.info(
        "Currently, we only allow Gmail and To The New domain for signup/login"
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.success) {
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      toast.success("signup successful");
      isLoading(false);
    } else {
      toast.error("Error:", result.message);
    }
  };

  const handleReset = () => {
    setemail("");
    setpassword("");
    setUsername("");
    toast.success("reset done");
  };

  if (Loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-1/2 max-w-md">
          <LoadingBar value={33} />
        </div>
      </div>
    );

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
            value={userName}
            setValue={setUsername}
          />
          <InputComponent
            LabelName="Email"
            color="rgba(28, 74, 42, 1)"
            input_type="email"
            img_url="./At sign.png"
            placeholder_name="example@123.com"
            value={email}
            setValue={setemail}
          />
          <InputComponent
            LabelName="Password"
            color="rgba(28, 74, 42, 1)"
            input_type="password"
            img_url="./Lock.svg"
            placeholder_name="Enter Your Password"
            isPasswordFlag={true}
            value={password}
            setValue={setpassword}
          />
          <Button_component
            text="Signup"
            color="#1C4A2A"
            onClick={() => {
              postData();
              isLoading(true);
            }}
            disabled={true}
          />
          <Button_component
            text="Reset"
            onClick={handleReset}
            color="#C6B09A"
            disabled={false}
          />
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
