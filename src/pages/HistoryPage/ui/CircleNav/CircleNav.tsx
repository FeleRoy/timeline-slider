import React, { memo, useEffect, useRef, useState } from "react";
import styles from "./CircleNav.module.scss";
import RoundButton from "@/shared/ui/RoundButton/RoundButton";

interface CircleNavProps {
    currentIndex: number;
    maxIndex: number;
    onLeftClick: () => void;
    onRightClick: () => void;
}

const CircleNav: React.FC<CircleNavProps> = ({
    currentIndex,
    maxIndex,
    onLeftClick,
    onRightClick
}) => {
  return (
    <>
    <div className={styles.wrapper}>
    <h3 className={styles.text}>0{currentIndex}/0{maxIndex}</h3>
    <div className={styles['button-wrapper']}>
        <RoundButton direction="<" onClick={onLeftClick}  disabled={currentIndex === 1}/>
        <RoundButton direction=">" onClick={onRightClick} disabled={currentIndex === maxIndex}/>
    </div>
    </div>
    </>
  );
};

export default memo(CircleNav);