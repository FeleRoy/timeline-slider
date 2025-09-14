import React, { useState } from "react";
import CircleButtons from "@/shared/ui/CircleButtons/CircleButtons";
import CircleNav from "./ui/CircleNav/CircleNav";
import styles from './HistoryPage.module.scss';
import BackgroundLines from "./ui/BackgroundLines/BackgroundLines";
import YearsSlider from "@/shared/ui/YearsSlider/YearsSlider";
import AnimatedDate from "@/shared/ui/AnimatedDate/AnimatedDate";
import { timelineDate } from "@/utils/types";
import { HistoryPageMock } from "./mock/mock";


interface HistoryPageProps {
  timelines?: timelineDate[]
}

const HistoryPage: React.FC<HistoryPageProps> = ({
  timelines = HistoryPageMock
}) => {
  const [currentPeriod, setCurrentPeriod] = useState(1);
    const handleButtonClick = (index: number) => {
    console.log('Нажата кнопка с индексом:', index + 1);
    setCurrentPeriod(index + 1);
  };

  return (
    <>
    <div className={styles.page}>
      <BackgroundLines/>

      <div className={styles.header}>
        <div className={styles['header-line']}></div>
        <h1>Исторические даты</h1>
      </div>
      
      <div className={styles['circle-wrapper']}>
      <CircleButtons btnCount={timelines.length} onBtnClick={handleButtonClick} activeIndex={currentPeriod - 1} setActiveIndex={setCurrentPeriod}></CircleButtons>
      </div>

      <div className={styles['date-wrapper']}>
      <AnimatedDate value={timelines[currentPeriod - 1].firstYear}/>
      <AnimatedDate color="red" value={timelines[currentPeriod - 1].lastYear}/>
      </div>
      <div className={styles['nav-wrapper']}>
      <CircleNav
        currentIndex={currentPeriod}
        maxIndex={timelines.length}
        onLeftClick={() => {
          setCurrentPeriod(currentPeriod - 1);
        }}
        onRightClick={() => {
          setCurrentPeriod(currentPeriod + 1);
        }}
      ></CircleNav>
      </div>
      <div className={styles['slider-wrapper']}>
      <YearsSlider date={timelines[currentPeriod - 1].yearsDate}/>
      </div>
    </div>
    </>
  );
};

export default HistoryPage;
