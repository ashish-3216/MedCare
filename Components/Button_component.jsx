"use client"
import React from "react";
import styles from "@/styles/button.module.css";

const Button_component = ({ text, color }) => {

  return (
    <div
      className={styles.container}
      role="button"
      onClick={() => console.log("hello jee")}
      tabIndex={0}
      style={{ backgroundColor: color }} 
    >
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Button_component;
