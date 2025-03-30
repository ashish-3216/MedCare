"use client";

import { useEffect, useState } from "react";
import ReviewCard from "@/Components/ReviewCard";
import styles from "@/styles/Reviews.module.css";
import Pagination from "@/Components/pagination";

const ITEMS_PER_PAGE = 8;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/review`);
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        setReviews(data.data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Calculate total pages based on the fetched reviews
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  // Slice data for current page
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Doctor Reviews</h1>
      {paginatedReviews.length > 0 ? (
        <div className={styles.grid}>
          {paginatedReviews.map((review) => (
            <ReviewCard key={review.r_id} {...review} />
          ))}
        </div>
      ) : (
        <p>No reviews available.</p>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ReviewsPage;
