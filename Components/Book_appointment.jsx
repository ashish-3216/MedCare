"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/book_appointment.module.css";
import Book_Form from "./Book_Form";
import Calendar from "./calender";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const Book_appointment = ({ data, id }) => {
  const [date, setDate] = useState("");
  const [toggle, setToggle] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notAvailable, setNotAvailable] = useState([]);
  const [morningRemaining, setMorningRemaining] = useState(8); // Assuming 8 slots for morning
  const [eveningRemaining, setEveningRemaining] = useState(8); // Assuming 8 slots for evening

  const location = () => setToggle((prev) => !prev);
  const router = useRouter() ;
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // Months are zero-indexed
    const day = d.getDate();
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    try {
      const type = toggle ? "online" : "offline";
      const loc = toggle ? null : data.doc_location;
      console.log(id);

      const response = await fetch(
        "http://localhost:5000/api/v1/bookappointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            appointment_date: formatDate(date),
            appointment_time: selectedSlot,
            doctor_id: id,
            type,
            location: loc,
          }),
        }
      );
      console.log(formatDate(date));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book appointment.");
      }

      const result = await response.json();
      toast.success(result.message);
      router.replace('/appointment');
      router
    } catch (err) {
      console.error("Error booking appointment:", err.message);
      toast.error("Error booking appointment. Please try again.");
    }
  };
  useEffect(() => {
    const today = new Date();
    setDate(formatDate(today));
  }, []);
  
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const result = await fetch(
          "http://localhost:5000/api/v1/bookappointment/details",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              doc_id: parseInt(id),
              appointment_date: formatDate(date),
            }),
          }
        );

        if (!result.ok) {
          const errorData = await result.json();
          throw new Error(errorData.message || "Failed to fetch slots.");
        }

        const data = await result.json();
        if (data.success) {
          const unavailableSlots = data.data
            .filter((item) => item.appointment_date === formatDate(date))
            .map((item) => item.appointment_time);
          setNotAvailable(unavailableSlots);

          const morningSlots = [
            "9:00 AM",
            "9:30 AM",
            "10:00 AM",
            "10:30 AM",
            "11:00 AM",
            "11:30 AM",
            "12:00 AM",
            "12:30 AM",
          ];
          const eveningSlots = [
            "4:00 PM",
            "4:30 PM",
            "5:00 PM",
            "5:30 PM",
            "6:00 PM",
            "6:30 PM",
            "7:00 PM",
            "7:30 PM",
          ];

          const bookedMorningSlots = unavailableSlots.filter((slot) =>
            morningSlots.includes(slot)
          ).length;
          const bookedEveningSlots = unavailableSlots.filter((slot) =>
            eveningSlots.includes(slot)
          ).length;

          setMorningRemaining(8 - bookedMorningSlots);
          setEveningRemaining(8 - bookedEveningSlots);
        }
      } catch (err) {
        console.error("Error fetching available slots:", err.message);
        toast.error("Error fetching available slots. Please try again.");
      }
    };

    fetchAvailableSlots();
  }, [id, date]);

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
            disabled={toggle}
            className={toggle ? styles.disabledDropdown : ""}
          >
            <option id={styles.live_location}>{data.doc_location}</option>
          </select>
        </div>
      </div>

      <Calendar setDate={setDate} />

      <Book_Form
        day_time={"Morning"}
        remaining_slots={morningRemaining}
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
        notAvailable={notAvailable}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />

      <Book_Form
        day_time={"Evening"}
        remaining_slots={eveningRemaining}
        slots_array={[
          "4:00 PM",
          "4:30 PM",
          "5:00 PM",
          "5:30 PM",
          "6:00 PM",
          "6:30 PM",
          "7:00 PM",
          "7:30 PM",
        ]}
        notAvailable={notAvailable}
        img_url={"/sunset.svg"}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />

      <button className={styles.Next_button} onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default Book_appointment;
