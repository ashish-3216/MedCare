"use client";
import Doctor_card from "@/Components/Doctor_card";
import styles from "@/styles/appointment.module.css";
import React, { useState, useEffect } from "react";
import Footer from "@/Components/Footer";
import Filter_component from "@/Components/Filter_component";
import doctors from '@/TempData/doctors.json' ;
import { useRouter } from "next/navigation";
const doctor_data = doctors.doctors ;

const Page = () => {
  const [query,setQuery] = useState('') ;
  const [searchValue,setSearchValue] = useState('') ;
  const [filteredDoctors, setFilteredDoctors] = useState(doctor_data);
  const [selectedRating, setSelectedRating] = useState(-1);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedGender, setSelectedGender] = useState("show all");
  const [doctorCount,setDoctorCount] = useState(0) ;
  const router = useRouter() ;

  // Function to apply both filters
  const filterDoctors = () => {
    let newDoctors = doctor_data;

    // Apply Rating filter if selected
    if (selectedRating === -1) {
      newDoctors = doctor_data;
    } else if (selectedRating !== -1) {
      newDoctors = newDoctors.filter(
        (doctor) => doctor.ratings === selectedRating
      );
    }

    // Apply Experience filter if selected
    if (selectedExperience !== "") {
      newDoctors = newDoctors.filter((doctor) => {
        const years = parseInt(doctor.experience);
        if (selectedExperience === "15+") return years >= 15;
        if (selectedExperience === "10-15") return years >= 10 && years < 15;
        if (selectedExperience === "5-10") return years >= 5 && years < 10;
        if (selectedExperience === "3-5") return years >= 3 && years < 5;
        if (selectedExperience === "1-3") return years >= 1 && years < 3;
        if (selectedExperience === "0-1") return years < 1;
        return false;
      });
    }

    //apply Gender filter if Selected
    if (selectedGender !== "show all") {
      newDoctors = newDoctors.filter(
        (doctor) => doctor.gender === selectedGender
      );
    }

    setFilteredDoctors(newDoctors);
    setDoctorCount(newDoctors.length) ;
  };

  // Run filtering whenever rating or experience changes
  useEffect(() => {
    filterDoctors();
  }, [selectedRating, selectedExperience, selectedGender]);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <p id={styles.text}>Find a doctor at your own ease</p>
        <div className={styles.searchField}>
          <div className={styles.searchBar_container}>
            <div className={styles.searchBar}>
              <img
                src="./Vector.svg"
                style={{ height: "20.02px", width: "20.02px" }}
                alt="search-icon"
              />
              <input
                type="text"
                placeholder="Search doctors"
                className={styles.search}
                onChange={(e)=> setSearchValue(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <button className={styles.searchButton} onClick={()=> setQuery(searchValue)}>Search</button>
        </div>
      </section>

      <section className={styles.doctor_container}>
        <section className={styles.title}>
          <p id={styles.text1}>{doctorCount} doctors available</p>
          <p id={styles.text2}>
            Book appointments with minimum wait-time & verified doctor details
          </p>
        </section>

        <section className={styles.main_stats}>
          <aside className={styles.leftBar}>
            <div className={styles.filterButtons}>
              <p>Filter By:</p>
              <button
                onClick={() => {
                  setSelectedRating(-1);
                  setSelectedExperience("");
                  setSelectedGender("show all");
                  // Reset radio button selection
                  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
                    radio.checked = radio.value === "0"; // Only check "Show All"
                  });
                }}
              >
                Reset
              </button>
            </div>

            <Filter_component
              title="Rating"
              stat="Star"
              array={[1, 2, 3, 4, 5]}
              optional="show all"
              cb={(value) => setSelectedRating(value)}
              defaultFlag={true}
            />
            <Filter_component
              title="Experience"
              stat="Years"
              array={["15+", "10-15", "5-10", "3-5", "1-3", "0-1"]}
              optional=""
              cb={(value) => setSelectedExperience(value)}
            />
            <Filter_component
              title="Gender"
              stat="Gender"
              array={["Male", "Female"]}
              optional="Show all"
              flag={false}
              cb={(value) => setSelectedGender(value)}
            />
          </aside>

          <div className={styles.doctor_grid}>
            {filteredDoctors.map((doctor, index) => (
             doctor.name.toLowerCase().includes(query) &&  <Doctor_card
                key={doctor.id}
                image_url={"./Frame.svg"}
                Name={`${doctor.name}, ${doctor.degree}`}
                role={doctor.specialization}
                experience={`${doctor.experience} years`}
                rating={doctor.ratings}
                onClick={() => router.push(`/appointment/${doctor.id}`)} 
              />
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
