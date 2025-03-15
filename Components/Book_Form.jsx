import React from "react";
import Image from "next/image";
import styles from "@/styles/BookForm.module.css";
const Book_Form = ({
  day_time,
  slots_array = [],
  remaining_slots = slots_array.length,
  img_url,
}) => {
  return (
      <div className={styles.time}>
        <div className={styles.top_container}>
          <div className={styles.leftSide}>
            <Image src={img_url} height={21.65} width={23.43} alt="day-time" />
            <p className={styles.shift}>{day_time}</p>
          </div>
          <div className={styles.rightSide}>
            <p className={styles.remaining_slots}>{remaining_slots} Slots</p>
          </div>
        </div>
        <hr style={{ border: "1px solid rgba(112, 112, 112, 0.15)" }}></hr>
        <div className={styles.bottom_container}>
          <div className={styles.slot_container}>
            {slots_array.map((_time,i) => {
              return <div key={i} role="button" className={styles.slot}>{_time}</div>; // Corrected: `{_time}` instead of `"_time"`
            })}
          </div>
        </div>
      </div>
  );
};

export default Book_Form;
