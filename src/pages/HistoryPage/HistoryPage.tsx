import React, { useEffect, useRef, useState } from "react";
import CircleButtons from "@/shared/ui/CircleButtons/CircleButtons";
import CircleNav from "./ui/CircleNav/CircleNav";
import styles from "./HistoryPage.module.scss";
import YearsSlider from "@/shared/ui/YearsSlider/YearsSlider";
import AnimatedDate from "@/shared/ui/AnimatedDate/AnimatedDate";
import { timelineDate } from "@/utils/types";
import { HistoryPageMock} from "./mock/mock";

import gsap from "gsap";

interface HistoryPageProps {
  timelines?: timelineDate[];
}

const HistoryPage: React.FC<HistoryPageProps> = ({
  timelines = HistoryPageMock,
}) => {
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const handleButtonClick = (index: number) => {
    setCurrentPeriod(index + 1);
  };
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1010;

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power1.out" }
      );
    }
  }, [currentPeriod]);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles["header-line"]}></div>
          <h1>Исторические <br /> даты</h1>
        </div>
        <div className={styles["date-container"]}>
          <div className={styles["first-year"]}>
            <AnimatedDate value={timelines[currentPeriod - 1].firstYear} />
          </div>
          {!isMobile && <div className={styles["circle-wrapper"]}>
            <CircleButtons
              radius={isTablet ? 200 : 265}
              title={timelines[currentPeriod - 1].title}
              btnCount={timelines.length}
              onBtnClick={handleButtonClick}
              activeIndex={currentPeriod - 1}
              setActiveIndex={setCurrentPeriod}
            ></CircleButtons>
          </div>}
          <div className={styles["second-year"]}>
            <AnimatedDate
              color="red"
              value={timelines[currentPeriod - 1].lastYear}
            />
          </div>
        </div>

        {!isMobile && <div className={styles["nav-wrapper"]}>
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
        </div>}
            {isMobile && <div className={styles['dividing-line']}></div>}
        <div className={styles["slider-wrapper"]}>
          <YearsSlider pagClass={styles["custom-pagination"]} date={timelines[currentPeriod - 1].yearsDate} />
        </div>

        {isMobile && <div className={styles["nav-wrapper"]}>
          <div>
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
          <div className={styles["custom-pagination"]}></div>
        </div>}
      </div>
    </>
  );
};

export default HistoryPage;
