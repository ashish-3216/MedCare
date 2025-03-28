"use client"
import React, { useState } from "react";
import styles from "../styles/input.module.css";

const InputComponent = ({
  LabelName,
  color,
  input_type,
  img_url,
  placeholder_name,
  isPasswordFlag = false ,
  value,
  setValue
}) => {
  const [toggleState,setToggle] = useState(false) ;
  return (
    <div className={styles.input_container}>
      <label htmlFor={input_type} className={styles.input_label}>
        {LabelName}
      </label>
      <div className={styles.input_wrapper}>
        <div className={styles.input_search}>
          <img src={img_url} className={styles.input_icon} alt="icon" />
          <input
                    className={styles.input_field}
                    type={toggleState ? "text" : input_type}
                    placeholder={placeholder_name}
                    value={value}
                    onChange={(e)=> setValue(e.target.value)}
                />
        </div>
        {isPasswordFlag && <img src="Eye.svg" alt="toggle password" role="button" id={styles.toggle} onClick={()=>{
          setToggle(!toggleState)
        }}/>}
      </div>
    </div>
  );
};

export default InputComponent;
