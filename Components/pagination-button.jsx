"use client"
import styles from "@/styles/Pagination.module.css";

const PaginationButton = ({ children, onClick, active = false, disabled = false, ...props }) => {
  return (
    <button
      className={`${styles.paginationButton} ${active ? styles.active : ""}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default PaginationButton

