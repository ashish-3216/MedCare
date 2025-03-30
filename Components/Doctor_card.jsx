import React from "react";
import styles from "@/styles/card.module.css";
import Link from "next/link";
const Doctor_card = ({ image_url, Name, role, experience, rating, location , onClick , id }) => {

  const handleBookClick = (e) => {
    e.stopPropagation(); 
  };


  return (
    <div className={styles.container} onClick={onClick} style={{ cursor: "pointer" }}>
      <div className={styles.details}>
        <div
          className={styles.image_frame}
          style={{ backgroundImage: `url(${image_url})` }}
        ></div>
        <div className={styles.title}>
          <p className={styles.name}>{Name}</p>
          <div className={styles.exp}>
            <div className={styles.special}>
              <p><img src="./stethoscope.svg"></img>{role}</p>
            </div>
            <div className={styles.experience}>
              
              <p><img src="./Hourglass.svg"></img>{experience}</p>
            </div>
          </div>
        </div>
        <div className={styles.rating_container}>
          <div className={styles.rating}>
            <p>Ratings:</p>
            {rating &&
              [...Array(rating)].map((_, i) => (
                <img
                  key={i}
                  className={styles.stars}
                  src="./Star.svg"
                  alt="STAR"
                />
              ))} 
          </div>
        </div>
      </div>
      <Link href={`/appointment/${id}/booking`} passHref>
          <button onClick={handleBookClick} className={styles.book}>
            Book Appointment
          </button>
        </Link>
    </div>
  );
};

export default Doctor_card;
