import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./YearInfoBlock.module.scss";
import { yearsDateInfo } from "@/utils/types";

type YearInfoBlockProps = yearsDateInfo;

const YearInfoBlock: React.FC<YearInfoBlockProps> = ({ year, text }) => {
  const blockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (blockRef.current) {
      gsap.fromTo(
        blockRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [year, text]);

  return (
    <div ref={blockRef} className={styles.wrapper}>
      <h3>{year}</h3>
      <p>{text}</p>
    </div>
  );
};

export default YearInfoBlock;
