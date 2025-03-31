'use client'
import { useState } from 'react';
import styles from '@/styles/doctor-review.module.css';
import { useParams } from 'next/navigation';
import { useLogin } from '@/context/LoggedInContext';
const ReviewForm = ({onSubmit}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const {user} =  useLogin();
  const doc_id = useParams();
  const handleStarClick = (index) => {
    setRating(index + 1);
  };
  const doctor_id = doc_id.id ;
  const name = user.user_name ;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ doctor_id, rating , review , name});
    setRating(0);
    setReview('');
    
  };
  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <div className={styles.starRating}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`${styles.star} ${index < rating ? styles.filled : ''}`}
            onClick={() => handleStarClick(index)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className={styles.textarea}
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit} type="submit">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
