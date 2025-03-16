"use client";
import Doctor_card from "@/Components/Doctor_card";
import styles from "@/styles/appointment.module.css";
import React, { useState, useEffect } from "react";
import Footer from "@/Components/Footer";
import Filter_component from "@/Components/Filter_component";
import doctors from "@/TempData/doctors.json";
import { useRouter } from "next/navigation";

const doctor_data = doctors.doctors;

const Page = () => {
  const [query, setQuery] = useState(""); // Stores the final search query
  const [searchValue, setSearchValue] = useState(""); // Stores input value before searching
  const [filteredDoctors, setFilteredDoctors] = useState(doctor_data);
  const [selectedRating, setSelectedRating] = useState(-1);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedGender, setSelectedGender] = useState("show all");
  const router = useRouter();

  // Function to filter doctors based on search query, rating, experience, and gender
  const filterDoctors = () => {
    let newDoctors = doctor_data;

    // ✅ Apply search filter based on the name
    if (query.trim() !== "") {
      newDoctors = newDoctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // ✅ Apply Rating filter
    if (selectedRating !== -1) {
      newDoctors = newDoctors.filter(
        (doctor) => doctor.ratings === selectedRating
      );
    }

    // ✅ Apply Experience filter
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

    // ✅ Apply Gender filter
    if (selectedGender !== "show all") {
      newDoctors = newDoctors.filter(
        (doctor) => doctor.gender === selectedGender
      );
    }

    setFilteredDoctors(newDoctors); // ✅ Update filtered doctors after all filters are applied
  };

  // ✅ Run filtering whenever query, rating, experience, or gender changes
  useEffect(() => {
    filterDoctors();
  }, [query, selectedRating, selectedExperience, selectedGender]);

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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value.toLowerCase())} // ✅ Update search input field
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setQuery(searchValue); // ✅ Pressing Enter triggers search automatically
                  }
                }}
              />
            </div>
          </div>
          <button
            className={styles.searchButton}
            onClick={() => setQuery(searchValue)} // ✅ Clicking search button also triggers search
          >
            Search
          </button>
        </div>
      </section>

      <section className={styles.doctor_container}>
        <section className={styles.title}>
          <p id={styles.text1}>{filteredDoctors.length} doctors available</p>
          {/* ✅ Doctor count updates dynamically */}
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
                  // ✅ Reset all filters and search input
                  setSelectedRating(-1);
                  setSelectedExperience("");
                  setSelectedGender("show all");
                  setQuery("");
                  setSearchValue("");

                  // ✅ Reset radio button selections
                  document
                    .querySelectorAll('input[type="radio"]')
                    .forEach((radio) => {
                      radio.checked = radio.value === "0";
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
          {/* {!filteredDoctors.length &&<div className={styles.not_found}><h1 > No Doctors Found!</h1></div> } */}
          <div className={styles.doctor_grid}>
            {filteredDoctors.map((doctor, index) => (
              <Doctor_card
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
