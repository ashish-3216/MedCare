import React from "react";
import styles from "@/styles/booking.module.css";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Book_Form from "@/Components/Book_Form";
import Book_appointment from "@/Components/Book_appointment";
const page = () => {
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
          <Book_appointment className={styles.form} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
