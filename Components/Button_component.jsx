"use client";
import React from "react";
import styles from "@/styles/button.module.css";

const Button_component = ({ text, color, onClick, disabled }) => {
  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onKeyDown={
        !disabled ? (e) => e.key === "Enter" && onClick?.() : undefined
      } // Supports Enter key
    >
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Button_component;
