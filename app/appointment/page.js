"use client";
import Doctor_card from "@/Components/Doctor_card";
import styles from "@/styles/appointment.module.css";
import React, { useState, useEffect } from "react";
import Footer from "@/Components/Footer";
import Filter_component from "@/Components/Filter_component";
import { useRouter } from "next/navigation";
import Pagination from "@/Components/pagination";

const ITEMS_PER_PAGE = 6; // Number of doctor cards per page

const Page = () => {
  // const { user } = useLogin();
  const [doctor_data, setDoctors] = useState([]);
  const [query, setQuery] = useState(""); // Stores search query (updated on pressing enter/search button)
  const [searchValue, setSearchValue] = useState(""); // Stores input text in the search field
  const [filteredDoctors, setFilteredDoctors] = useState(doctor_data); // Holds filtered doctors
  const [selectedRating, setSelectedRating] = useState(-1); // Selected rating for filtering
  const [selectedExperience, setSelectedExperience] = useState(""); // Selected experience filter
  const [selectedGender, setSelectedGender] = useState("show all"); // Selected gender filter
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/doctor");
        const result = await res.json();
        setDoctors(result.data);
        return;
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoctors();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE); // ✅ Correct pagination based on filtered doctors

  // ✅ Slice filtered doctors to show only those for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

 /**
 * Filters doctors based on search query, rating, experience, gender, disease,
 * and sorts by rating in descending order.
 */
const filterDoctors = () => {
  let newDoctors = doctor_data; // Start with all doctors
  
  // ✅ Apply search filter based on name, specialization, location, and ID
  if (query.trim() !== "") {
    newDoctors = newDoctors.filter((doctor) => {
      return (
        doctor.id.toString().includes(query) ||
        doctor.doc_name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(query.toLowerCase()) ||
        doctor.doc_location.toLowerCase().includes(query.toLowerCase()) || 
        doctor.treatable_diseases.some(disease => disease.toLowerCase().includes(query.toLowerCase()))
      );
    });
  }
  
  // ✅ Apply Rating filter
  if (selectedRating !== -1) {
    newDoctors = newDoctors.filter(
      (doctor) => doctor.rating === selectedRating
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
  
  setFilteredDoctors(newDoctors); // Update filtered doctors
  setCurrentPage(1); // ✅ Reset pagination to first page after filtering
};

// ✅ Run filtering whenever search query, rating, experience, gender, or disease changes
useEffect(() => {
  filterDoctors();
}, [doctor_data, query, selectedRating, selectedExperience, selectedGender]);

  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
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
                onChange={(e) => setSearchValue(e.target.value.toLowerCase())} // ✅ Update search input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setQuery(searchValue); // ✅ Pressing Enter triggers search
                  }
                }}
              />
            </div>
          </div>
          <button
            className={styles.searchButton}
            onClick={() => setQuery(searchValue)}
          >
            Search
          </button>
        </div>
      </section>

      {/* DOCTOR LISTING */}
      <section className={styles.doctor_container}>
        <section className={styles.title}>
          <p id={styles.text1}>{filteredDoctors.length} doctors available</p>
          <p id={styles.text2}>
            Book appointments with minimum wait-time & verified doctor details
          </p>
        </section>

        <section className={styles.main_stats}>
          {/* FILTER SIDEBAR */}
          <aside className={styles.leftBar}>
            <div className={styles.filterButtons}>
              <p>Filter By:</p>
              <button
                onClick={() => {
                  // ✅ Reset all filters and search
                  setSelectedRating(-1);
                  setSelectedExperience("");
                  setSelectedGender("show all");
                  setQuery("");
                  setSearchValue("");

                  // ✅ Reset radio buttons
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
              cb={(value) => setSelectedGender(value)}
            />
          </aside>

          {/* DOCTOR GRID */}
          <div className={styles.doctor_grid}>
            {selectedDoctors.map((doctor, index) => (
              <Doctor_card
                key={doctor.id}
                image_url={doctor.img_url}
                Name={`${doctor.doc_name}, ${doctor.doc_degree}`}
                role={doctor.specialization}
                experience={`${doctor.experience} years`}
                rating={doctor.rating}
                id={doctor.id}
                onClick={() => router.push(`/appointment/${doctor.id}`)}
              />
            ))}
          </div>
        </section>

        {/* ✅ PAGINATION COMPONENT */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>

      <Footer />
    </div>
  );
};

export default Page;
