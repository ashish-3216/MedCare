"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/booking.module.css";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Book_appointment from "@/Components/Book_appointment";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
const page = () => {
  const [doctor_data, setDoctorData] = useState(null);
  const { id } = useParams();

  const fetchDoctor = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/doctor/${id}`);
      const data = await res.json();
      setDoctorData(data.data);
      return;
    } catch (err) {
      console.log("error while fetching", err);
    }
  };

  useEffect(() => {
    if (id) fetchDoctor();
  }, [id]);

  if(!doctor_data) 
    return <h1>No doctor found!!</h1>;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <p className={styles.heading}>
            Book Your Next Doctor Visit in Seconds.
          </p>
          <p className={styles.content}>
            CareMate helps you find the best healthcare provider by specialty,
            location, and more, ensuring you get the care you need.
          </p>
        </div>
        <div className={styles.rightSide}>
          <Image
            src={"/back_booking.png"}
            fill
            alt="background"
            className={styles.back_img}
          />
          <Book_appointment data = {doctor_data} id={id} className={styles.form}  />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
