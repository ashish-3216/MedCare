"use client"
import { useState, useRef, useEffect } from "react";
import styles from "@/styles/calender.module.css";

const Calendar = ({setDate}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [visibleDates, setVisibleDates] = useState([]);
  const scrollRef = useRef(null);

  // Generate days of the selected month starting from today (for current month)
  const generateMonthDates = (month) => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
      const newDate = new Date(day);
      if (month.getMonth() === today.getMonth() && newDate < today) {
        continue; // Skip past dates in current month
      }
      dates.push(newDate);
    }
    return dates;
  };
  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate, setDate]);
  
  // Ensure visible dates update when month changes
  useEffect(() => {
    setVisibleDates(generateMonthDates(currentMonth));
  }, [currentMonth]);

  // Change to next month
  const nextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Change to previous month (only if it's not before the current month)
  const prevMonth = () => {
    const today = new Date();
    const previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (previousMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(previousMonth);
    }
  };

  // Scroll left/right in the 7-day list
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 70 * 7; // Adjusted width to fit 7 buttons
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.calendar_container}>
      {/* Month Navigation */}
      <div className={styles.month_navigation}>
        <button className={styles.nav_btn} onClick={prevMonth}>{"<"}</button>
        <span className={styles.month_label}>
          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button className={styles.nav_btn} onClick={nextMonth}>{">"}</button>
      </div>

      {/* Scrollable 7-Day Calendar */}
      <div className={styles.scroll_wrapper}>
        <button className={styles.scroll_btn} onClick={() => scroll("left")}>{"<"}</button>
        <div className={styles.dates_list} ref={scrollRef}>
          {visibleDates.map((date, index) => (
            <button
              key={index}
              className={`${styles.date_button} ${
                selectedDate.toDateString() === date.toDateString() ? styles.selected : ""
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {date.toLocaleDateString("en-US", { weekday: "short" })} <br />
              {date.getDate()} {date.toLocaleDateString("en-US", { month: "short" })}
            </button>
          ))}
        </div>
        <button className={styles.scroll_btn} onClick={() => scroll("right")}>{">"}</button>
      </div>
    </div>
  );
};

export default Calendar;
