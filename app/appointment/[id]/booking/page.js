"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/booking.module.css";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Book_appointment from "@/Components/Book_appointment";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import LoadingBar from '@/Components/LoadingBar';
const Page = () => {
  const [doctor_data, setDoctorData] = useState(null);
  const { id } = useParams();
  const [Loading, setLoading] = useState(true);

  const fetchDoctor = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/doctor/${id}`
      );
      const data = await res.json();
      setDoctorData(data.data);
      setLoading(false)
      return;
    } catch (err) {
      console.log("error while fetching", err);
    }
  };

  useEffect(() => {
    if (id) fetchDoctor();
  }, [id]);

  if (Loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-1/2 max-w-md">
          <LoadingBar value={33} />
        </div>
      </div>
    );

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
          <Book_appointment
            data={doctor_data}
            id={id}
            className={styles.form}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
