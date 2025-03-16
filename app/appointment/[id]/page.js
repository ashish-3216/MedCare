"use client";
import { useParams } from "next/navigation";
import doctorData from "@/TempData/doctors.json";
import styles from '@/styles/id_page.module.css'
export default function ProfilePage() {
  const { id } = useParams();  // Ensure this matches the route parameter
  
  // Convert id to a number if needed
  const doctor_data = doctorData.doctors.find(doctor => String(doctor.id) === id);

  if (!doctor_data) {
    return <h1>Doctor not found</h1>;
  }

  return(
    <div className={styles.doctor_div}>

    </div>
  )
}
