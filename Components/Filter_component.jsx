import React from "react";
import styles from "@/styles/filter.module.css";

const FilterComponent = ({ title, stat, array, optional, flag = true , cb }) => {
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <p className={styles.title}>{title}</p>
        <div className={styles.content}>
          {optional && (
            <div key="showAll" className={styles.radioGroup}>
              <input
                type="radio"
                className={styles.radioInput}
                id={`showAll-${stat}`}
                name={stat}
                value={0}
                defaultChecked
                onChange={title === 'Rating' ? () => cb(-1) : () => cb('show all')}
              />
              <label htmlFor={`showAll-${stat}`}>{optional}</label>
            </div>
          )}
          {array.map((num,index) => {
            const id = `filter-${num}`;
            return (
              <div key={id} className={styles.radioGroup}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  id={id}
                  name={stat}
                  value={num}
                  onClick={() => cb(num)}
                />
                <label htmlFor={id}>{`${num} ${flag ? stat : ""}`}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
