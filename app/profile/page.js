"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/context/LoggedInContext";
import styles from "@/styles/profile.module.css";

const PatientProfilePage = () => {
  const { user } = useLogin();
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/bookappointment/user?user_email=${user.user_emailid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log(data);
        setPatientData(user);
        console.log(user);
        setAppointments(data.data);
        console.log(appointments);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchPatientData();
  }, []);

  if (!user) {
    return (
      <div className={styles.redirectMessage}>
        <h1>Please login first</h1>
        <h5>Redirecting to Login page.</h5>
        {setTimeout(() => {
          router.push("login");
        }, 1500)}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Patient Profile Section */}
      <div className={styles.profileSection}>
        <h2 className={styles.heading}>Patient Profile</h2>
        {patientData ? (
          <div className={styles.text}>
            <p>
              <strong>Name:</strong> {patientData.user_name}
            </p>
            <p>
              <strong>Email:</strong> {patientData.user_emailid}
            </p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Appointments Section */}
      <div className={styles.appointmentsSection}>
        <h2 className={styles.heading}>Appointments</h2>
        {appointments.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Date</th>
                <th className={styles.tableHeader}>Time</th>
                <th className={styles.tableHeader}>Doctor</th>
                <th className={styles.tableHeader}>Specialization</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Type</th>
                <th className={styles.tableHeader}>Location</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .sort(
                  (a, b) =>
                    new Date(b.appointment_date) - new Date(a.appointment_date)
                )
                .map((appointment) => (
                  <tr key={appointment.id} className={styles.tableRow}>
                    <td className={styles.tableData}>
                      {appointment.appointment_date}
                    </td>
                    <td className={styles.tableData}>
                      {appointment.appointment_time}
                    </td>
                    <td className={styles.tableData}>{appointment.doc_name}</td>
                    <td className={styles.tableData}>
                      {appointment.specialization}
                    </td>
                    <td className={styles.tableData}>{appointment.status}</td>
                    <td className={styles.tableData}>{appointment.type}</td>
                    <td className={styles.tableData}>
                      {appointment.location ? appointment.location : "Virtual"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientProfilePage;
