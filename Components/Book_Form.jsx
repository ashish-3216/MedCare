import React from "react";
import Image from "next/image";
import styles from "@/styles/BookForm.module.css";

const Book_Form = ({
  day_time,
  slots_array = [],
  notAvailable = [],
  remaining_slots ,
  img_url,
  selectedSlot,
  setSelectedSlot,
}) => {

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot); // Select only one slot across both components
  };

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

      <hr style={{ border: "1px solid rgba(112, 112, 112, 0.15)" }} />

      <div className={styles.bottom_container}>

        <div className={styles.slot_container}>
          {slots_array.map((_time, i) => {
            const isDisabled = notAvailable.includes(_time);
            return (
              <div
                key={i}
                role="button"
                onClick={() => handleSlotClick(_time)}
                className={`${styles.slot} 
                  ${selectedSlot === _time ? styles.selected : ""} 
                  ${isDisabled ? styles.disabled : ""}`}
              >
                {_time}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Book_Form;
