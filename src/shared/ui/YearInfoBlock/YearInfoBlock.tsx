import React from "react";
import styles from "./YearInfoBlock.module.scss";


interface YearInfoBlockProps {
    year: number | string;
    text: string;
}

const YearInfoBlock: React.FC<YearInfoBlockProps> = ({
    year,
    text
}) => {
  return (
    <>
        <div className={styles.wrapper}>
            <h3>{year}</h3>
            <p>{text}</p>
        </div>
    </>
  );
};

export default YearInfoBlock;