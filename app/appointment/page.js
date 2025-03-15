"use client";
import Doctor_card from "@/Components/Doctor_card";
import styles from "@/styles/appointment.module.css";
import React, { useState, useEffect } from "react";
import Footer from "@/Components/Footer";
import Filter_component from "@/Components/Filter_component";

const doctor_data = [
  {
    name: "Tony Stark",
    degree: "MDS",
    specialization: "Dentist",
    experience: 4,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Bruce Banner",
    degree: "MD",
    specialization: "General Physician",
    experience: 10,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Stephen Strange",
    degree: "MCh",
    specialization: "Neurosurgeon",
    experience: 15,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Peter Parker",
    degree: "BDS",
    specialization: "Orthodontist",
    experience: 3,
    ratings: 3,
    gender: "Male",
  },
  {
    name: "Natasha Romanoff",
    degree: "MBBS",
    specialization: "Dermatologist",
    experience: 7,
    ratings: 4,
    gender: "Female",
  },
  {
    name: "Steve Rogers",
    degree: "MD",
    specialization: "Cardiologist",
    experience: 12,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Wanda Maximoff",
    degree: "MD",
    specialization: "Psychiatrist",
    experience: 5,
    ratings: 4,
    gender: "Female",
  },
  {
    name: "Thor Odinson",
    degree: "MS",
    specialization: "Orthopedic Surgeon",
    experience: 8,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Loki Laufeyson",
    degree: "PhD",
    specialization: "Neurologist",
    experience: 6,
    ratings: 3,
    gender: "Male",
  },
  {
    name: "Clint Barton",
    degree: "DO",
    specialization: "Ophthalmologist",
    experience: 9,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Scott Lang",
    degree: "BDS",
    specialization: "Pediatric Dentist",
    experience: 4,
    ratings: 3,
    gender: "Male",
  },
  {
    name: "Carol Danvers",
    degree: "MD",
    specialization: "Oncologist",
    experience: 11,
    ratings: 5,
    gender: "Female",
  },
  {
    name: "Nick Fury",
    degree: "MBBS",
    specialization: "Pulmonologist",
    experience: 20,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Sam Wilson",
    degree: "MD",
    specialization: "General Physician",
    experience: 6,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Bucky Barnes",
    degree: "MCh",
    specialization: "Plastic Surgeon",
    experience: 13,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Shuri",
    degree: "PhD",
    specialization: "Biomedical Scientist",
    experience: 9,
    ratings: 4,
    gender: "Female",
  },
  {
    name: "T'Challa",
    degree: "MD",
    specialization: "Cardiothoracic Surgeon",
    experience: 14,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Okoye",
    degree: "MBBS",
    specialization: "Trauma Surgeon",
    experience: 8,
    ratings: 5,
    gender: "Female",
  },
  {
    name: "Vision",
    degree: "PhD",
    specialization: "Neuroscientist",
    experience: 7,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Gamora",
    degree: "MD",
    specialization: "General Surgeon",
    experience: 12,
    ratings: 5,
    gender: "Female",
  },
  {
    name: "Drax",
    degree: "DO",
    specialization: "Emergency Medicine",
    experience: 5,
    ratings: 3,
    gender: "Male",
  },
  {
    name: "Rocket Raccoon",
    degree: "MS",
    specialization: "Veterinary Surgeon",
    experience: 6,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Groot",
    degree: "PhD",
    specialization: "Botanical Medicine",
    experience: 10,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Nebula",
    degree: "MD",
    specialization: "Neurologist",
    experience: 8,
    ratings: 5,
    gender: "Female",
  },
  {
    name: "Mantis",
    degree: "MD",
    specialization: "Psychiatrist",
    experience: 4,
    ratings: 3,
    gender: "Female",
  },
  {
    name: "Yondu Udonta",
    degree: "MBBS",
    specialization: "Pulmonologist",
    experience: 11,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Ego",
    degree: "MD",
    specialization: "Endocrinologist",
    experience: 25,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Hank Pym",
    degree: "PhD",
    specialization: "Microbiologist",
    experience: 18,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Janet Van Dyne",
    degree: "MD",
    specialization: "Dermatologist",
    experience: 15,
    ratings: 4,
    gender: "Female",
  },
  {
    name: "Hope Van Dyne",
    degree: "MD",
    specialization: "General Physician",
    experience: 7,
    ratings: 4,
    gender: "Female",
  },
  {
    name: "Reed Richards",
    degree: "PhD",
    specialization: "Geneticist",
    experience: 22,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Sue Storm",
    degree: "MD",
    specialization: "Pediatrician",
    experience: 12,
    ratings: 5,
    gender: "Female",
  },
  {
    name: "Johnny Storm",
    degree: "MBBS",
    specialization: "Sports Medicine",
    experience: 6,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Ben Grimm",
    degree: "DO",
    specialization: "Orthopedic Surgeon",
    experience: 9,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Professor X",
    degree: "PhD",
    specialization: "Neuroscientist",
    experience: 30,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Magneto",
    degree: "PhD",
    specialization: "Oncologist",
    experience: 28,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Jean Grey",
    degree: "MD",
    specialization: "Psychiatrist",
    experience: 12,
    ratings: 5,
    gender: "Female",
  },
  {
    name: "Cyclops",
    degree: "MD",
    specialization: "Ophthalmologist",
    experience: 10,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Wolverine",
    degree: "MBBS",
    specialization: "Trauma Surgeon",
    experience: 20,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Storm",
    degree: "MD",
    specialization: "Pediatrician",
    experience: 9,
    ratings: 4,
    gender: "Female",
  },
  {
    name: "Mystique",
    degree: "MD",
    specialization: "Plastic Surgeon",
    experience: 11,
    ratings: 5,
    gender: "Female",
  },
  {
    name: "Rogue",
    degree: "DO",
    specialization: "Internal Medicine",
    experience: 8,
    ratings: 4,
    gender: "Female",
  },
  {
    name: "Gambit",
    degree: "MBBS",
    specialization: "Cardiologist",
    experience: 7,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Nightcrawler",
    degree: "MD",
    specialization: "Anesthesiologist",
    experience: 6,
    ratings: 4,
    gender: "Male",
  },
  {
    name: "Colossus",
    degree: "PhD",
    specialization: "Biomedical Scientist",
    experience: 10,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Deadpool",
    degree: "MD",
    specialization: "Trauma Surgeon",
    experience: 8,
    ratings: 5,
    gender: "Male",
  },
  {
    name: "Doctor Doom",
    degree: "PhD",
    specialization: "Neuroscientist",
    experience: 20,
    ratings: 5,
    gender: "Male",
  },
];

const Page = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctor_data);
  const [selectedRating, setSelectedRating] = useState(-1);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedGender, setSelectedGender] = useState("show all");

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
              />
            </div>
          </div>
          <button className={styles.searchButton}>Search</button>
        </div>
      </section>

      <section className={styles.doctor_container}>
        <section className={styles.title}>
          <p id={styles.text1}>{filteredDoctors.length} doctors available</p>
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
              <Doctor_card
                key={index}
                image_url={"./Frame.svg"}
                Name={`${doctor.name}, ${doctor.degree}`}
                role={doctor.specialization}
                experience={`${doctor.experience} years`}
                rating={doctor.ratings}
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
