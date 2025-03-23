"use client";
import { useParams } from "next/navigation";
// import doctorData from "@/TempData/doctors.json";
import { useState , useEffect } from "react";
import styles from "@/styles/id_page.module.css";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const availability = ["9 AM - 12 PM", "1 PM - 5 PM"] ;
  const [doctor_data,setDoctorData] = useState([]) ;

  const { id } = useParams();  
  const router = useRouter() ;

  useEffect(()=>{
    try{
      const fetchDoctor = async () => {
        const res = await fetch(`http://localhost:5000/api/v1/doctor/${id}`)
        const doc = await res.json() ;
        setDoctorData(doc.data) ;
        return ;
      };  
      fetchDoctor() ;
    }catch(err){
      console.log(err) ;
    }
  },[])



  // Find doctor by ID
  // const doctor_data = doctorData.doctors.find(
  //   (doctor) => String(doctor.id) === id
  // );

  if (!doctor_data) {
    return <h1>Doctor not found</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        {/* Doctor Image */}
        <div
          className={styles.image_frame}
          style={{
            backgroundImage: `url('/Frame.svg')`, // Change if you have actual image URLs
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Doctor Title & Details */}
        <div className={styles.title}>
          <p className={styles.name}>{doctor_data.doc_name}, <span className={styles.degree}>{doctor_data.doc_degree}</span></p>
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
        <p className={styles.location}><strong>Location:</strong> {doctor_data.doc_location}</p>
        <p className={styles.availability}><strong>Available:</strong> {availability.join(", ")}</p>
      </div>

      {/* Book Appointment Button */}
      <button className={styles.book} onClick={()=>router.push(`/appointment/${id}/booking`)}>Book Appointment</button>
    </div>
  );
}
