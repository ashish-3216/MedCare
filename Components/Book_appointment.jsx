"use client";
import React, { useState } from "react";
import styles from "@/styles/book_appointment.module.css";
import Book_Form from "./Book_Form";
const Book_appointment = ({data}) => {
  const [toggle, setToggle] = useState(true);
  const location = () => setToggle(!toggle);
  return (
    <div className={styles.container}>
      <div className={styles.schedule_appointment}>
        <div className={styles.top}>
          <div className={styles.top_text}>
            <p>Schedule Appointment</p>
          </div>
          <button>Book Appointment</button>
        </div>
        <div className={styles.tab}>
          <div
            className={styles.video_consult}
            role="button"
            style={{
              backgroundColor: toggle
                ? "rgba(28, 74, 42, 1)"
                : "rgba(255, 255, 255, 1)",
              color: toggle ? "white" : "black",
            }}
            onClick={location}
          >
            Book Video Consult
          </div>

          <div
            className={styles.hospital_visit}
            role="button"
            style={{
              backgroundColor: !toggle
                ? "rgba(28, 74, 42, 1)"
                : "rgba(255, 255, 255, 1)",
              color: !toggle ? "white" : "black",
            }}
            onClick={location}
          >
            Book Hospital Visit
          </div>
        </div>
        <div className={styles.drop_down}>
          <select
            name="live_location"
            id={styles.list}
            disabled={toggle} // Disable when Video Consult is selected
            className={toggle ? styles.disabledDropdown : ""}
          >
            <option id={styles.live_location}>
             {data.doc_location}
            </option>
          </select>
        </div>
      </div>
      <Book_Form
        day_time={"Morning"}
        remaining_slots={"8"}
        slots_array={[
          "9:00 AM",
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "12:00 AM",
          "12:30 AM",
        ]}
        img_url={"/sun.svg"}
      />
      <Book_Form
        day_time={"Afternoon"}
        remaining_slots={"8"}
        slots_array={[
          "9:00 AM",
          "9:30 AM",
          "10:00 AM",
          "10:30 AM",
          "11:00 AM",
          "11:30 AM",
          "12:00 AM",
          "12:30 AM",
        ]}
        img_url={"/sunset.svg"}
      />
      <button className={styles.Next_button}>Next</button>
    </div>
  );
};
export default Book_appointment;
