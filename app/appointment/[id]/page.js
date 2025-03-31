"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/styles/id_page.module.css";
import ReviewForm from '@/Components/doctor-review';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function ProfilePage() {
  const availability = ["9 AM - 12 PM", "1 PM - 5 PM"];
  const [doctor_data, setDoctorData] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const handleReviewSubmit = async (review) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/review/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error('cant submit review right now');
        throw new Error(result.message || "Failed to submit review.");
      }
      setShowReview(false);
      toast.success('review submitted successfully');
    } catch (err) {
      toast.error(err.message);
      console.error("Error submitting review:", err);
    }
  };

  useEffect(() => {
    try {
      const fetchDoctor = async () => {
        const res = await fetch(`http://localhost:5000/api/v1/doctor/${id}`);
        const doc = await res.json();
        setDoctorData(doc.data);
        return;
      };
      fetchDoctor();
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!doctor_data) {
    return <h1>Doctor not found</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles["img-review"]}>
          {/* Doctor Image */}
          <div
            className={styles.image_frame}
            style={{
              backgroundImage: `url(${doctor_data.img_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        {/* Doctor Title & Details */}
        <div className={styles.title}>
          <p className={styles.name}>
            {doctor_data.doc_name},{" "}
            <span className={styles.degree}>{doctor_data.doc_degree}</span>
          </p>
        </div>
        <div className={styles.exp}>
          <div className={styles.special}>
            <img src="/stethoscope.svg" alt="Specialization Icon" />
            <p>{doctor_data.specialization}</p>
          </div>
          <div className={styles.experience}>
            <img src="/Hourglass.svg" alt="Experience Icon" />
            <p>{doctor_data.experience} years experience</p>
          </div>
        </div>

        {/* Ratings */}
        <div className={styles.rating_container}>
          <div className={styles.rating}>
            <p>Ratings:</p>
            {console.log(doctor_data)}
            {[...Array(doctor_data.rating)].map((_, i) => (
              <img
                key={i}
                className={styles.stars}
                src="/Star.svg"
                alt="Star"
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <p className={styles.description}>{doctor_data.description}</p>

        {/* Availability & Location */}
        <p className={styles.location}>
          <strong>Location:</strong> {doctor_data.doc_location}
        </p>
        {doctor_data.treatable_diseases?.length > 0 && (
          <div className={styles.treatableDiseases}>
            <h4>Diseases Treated:</h4>
            <ul>
              {doctor_data.treatable_diseases.map((disease, index) => (
                <li key={index}>{disease}</li>
              ))}
            </ul>
          </div>
        )}
        <p className={styles.availability}>
          <strong>Available:</strong> {availability.join(", ")}
        </p>
      </div>

      {/* Book Appointment Button */}
      <button
        className={styles.book}
        onClick={() => router.push(`/appointment/${id}/booking`)}
      >
        Book Appointment
      </button>
      <button
        className={styles.review}
        onClick={() => setShowReview((prev) => !prev)}
      >
        {showReview ? "Close Review Form" : "Write a Review"}
      </button>

      {showReview && <ReviewForm onSubmit={handleReviewSubmit} />}
    </div>
  );
}
