import React from "react";
import styles from "../styles/input.module.css";

const InputComponent = ({
  LabelName,
  color,
  input_type,
  img_url,
  placeholder_name,
}) => {
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
                    type={input_type}
                    placeholder={placeholder_name}
                />
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
