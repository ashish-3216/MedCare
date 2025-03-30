import styles from '@/styles/ReviewCard.module.css';

const ReviewCard = ({ username, rating, review_text, doc_name, specialization }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.username}>Reviewed by: {username}</h3>
      <p className={styles.doctor}>Doctor: Dr. {doc_name} ({specialization})</p>
      <p className={styles.rating}>⭐ Rating: {rating} / 5</p>
      <p className={styles.review}>{review_text}</p>
    </div>
  );
};

export default ReviewCard;


