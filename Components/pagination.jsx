"use client"
import styles from "@/styles/Pagination.module.css";

// export default function Pagination({ currentPage, totalPages, onPageChange }) {
//   return (
//     <div className={styles.paginationContainer}>
//       <button
//         className={styles.pageButton}
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>

//       <span className={styles.pageInfo}>
//         Page {currentPage} of {totalPages}
//       </span>

//       <button
//         className={styles.pageButton}
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   );
// }


// import { ChevronLeft, ChevronRight } from "lucide-react"
// // import styles from "./pagination.module.css"
// import PaginationButton from "./pagination-button"

// const Pagination = ({ currentPage = 2, totalPages = 24, onPageChange }) => {
//   // Calculate which page numbers to show
//   const getPageNumbers = () => {
//     const pageNumbers = []

//     // Always show first page
//     pageNumbers.push(1)

//     // Show current page and surrounding pages
//     for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
//       pageNumbers.push(i)
//     }

//     // Show ellipsis if needed
//     if (currentPage + 1 < totalPages - 1) {
//       pageNumbers.push("...")
//     }

//     // Show last few pages
//     for (let i = Math.max(totalPages - 2, currentPage + 2); i <= totalPages; i++) {
//       if (i > currentPage + 1) {
//         pageNumbers.push(i)
//       }
//     }

//     return pageNumbers
//   }

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages && page !== currentPage) {
//       onPageChange?.(page)
//     }
//   }

//   const pageNumbers = getPageNumbers()

//   return (
//     <div className={styles.paginationContainer}>
//       <div className={styles.pagination}>
//         <PaginationButton
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           aria-label="Previous page"
//         >
//           <ChevronLeft size={16} />
//           <span>Prev</span>
//         </PaginationButton>

//         {pageNumbers.map((page, index) =>
//           page === "..." ? (
//             <span key={`ellipsis-${index}`} className={styles.ellipsis}>
//               ...
//             </span>
//           ) : (
//             <PaginationButton
//               key={page}
//               onClick={() => handlePageChange(page)}
//               active={page === currentPage}
//               aria-label={`Page ${page}`}
//               aria-current={page === currentPage ? "page" : undefined}
//             >
//               {page}
//             </PaginationButton>
//           ),
//         )}

//         <PaginationButton
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           aria-label="Next page"
//         >
//           <span>Next</span>
//           <ChevronRight size={16} />
//         </PaginationButton>
//       </div>
//       <div className={styles.activeIndicator} />
//     </div>
//   )
// }

// export default Pagination




import { ChevronLeft, ChevronRight } from "lucide-react";
import PaginationButton from "./pagination-button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(1); // Always show first page

    // Show pages around the current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbers.push(i);
    }

    // Show ellipsis if necessary
    if (currentPage + 2 < totalPages) {
      pageNumbers.push("...");
    }

    // Ensure the last page is always displayed
    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        {/* Previous Button */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          <span>Prev</span>
        </PaginationButton>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <PaginationButton
              key={page}
              onClick={() => handlePageChange(page)}
              active={page === currentPage}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </PaginationButton>
          )
        )}

        {/* Next Button */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </PaginationButton>
      </div>
      <div className={styles.activeIndicator} />
    </div>
  );
};

export default Pagination;
