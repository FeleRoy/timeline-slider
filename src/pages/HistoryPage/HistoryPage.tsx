import React, { useState } from "react";
import CircleButtons from "@/shared/ui/CircleButtons/CircleButtons";
import CircleNav from "./ui/CircleNav/CircleNav";
import styles from './HistoryPage.module.scss';
import BackgroundLines from "./ui/BackgroundLines/BackgroundLines";
import cn from 'classnames';


interface HistoryPageProps {}

const HistoryPage: React.FC<HistoryPageProps> = ({}) => {
  const [currentPeriod, setCurrentPeriod] = useState(1);
    const handleButtonClick = (index: number) => {
    console.log('Нажата кнопка с индексом:', index + 1);
    setCurrentPeriod(index + 1);
  };
  return (
    <>
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles['header-line']}></div>
        <h1>Исторические даты</h1>
      </div>
      <BackgroundLines/>
      <CircleButtons onBtnClick={handleButtonClick} activeIndex={currentPeriod - 1} setActiveIndex={setCurrentPeriod} ></CircleButtons>
      <CircleNav
        currentIndex={currentPeriod}
        maxIndex={6}
        onLeftClick={() => {
          setCurrentPeriod(currentPeriod - 1);
        }}
        onRightClick={() => {
          setCurrentPeriod(currentPeriod + 1);
        }}
      ></CircleNav>
    </div>
    </>
  );
};

export default HistoryPage;
