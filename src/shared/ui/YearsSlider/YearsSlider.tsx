import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import YearInfoBlock from "../YearInfoBlock/YearInfoBlock";

import "swiper/css";
import "swiper/css/navigation";
import "./YearsSlider.module.scss";
import styles from "./YearsSlider.module.scss";

import { Navigation } from "swiper/modules";

import LeftArrow from "@/assets/LeftArrow.svg";
import RightArrow from "@/assets/RightArrow.svg";
import { yearsDateInfo } from "@/utils/types";

interface YearsSliderProps {
  date: yearsDateInfo[];
}

const YearsSlider: React.FC<YearsSliderProps> = ({ date }) => {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      <div className={styles.sliderContainer}>
        <Swiper
          ref={swiperRef}
          navigation={{
            nextEl: `.${styles.customNext}`,
            prevEl: `.${styles.customPrev}`,
          }}
          modules={[Navigation]}
          className={styles.mySwiper}
          spaceBetween={80}
          slidesPerView="auto"
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {date.map((slide, index) => (
            <SwiperSlide style={{ width: "400px" }} key={index}>
              <YearInfoBlock
                year={slide.year}
                text={slide.text}
              ></YearInfoBlock>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`${styles.navButton} ${styles.customPrev} ${
            isBeginning ? styles.disabled : ""
          }`}
          onClick={handlePrev}
          disabled={isBeginning}
        >
          <LeftArrow width="10" height="14" viewBox="0 0 10 14" />
        </button>

        <button
          className={`${styles.navButton} ${styles.customNext} ${
            isEnd ? styles.disabled : ""
          }`}
          onClick={handleNext}
          disabled={isEnd}
        >
          <RightArrow width="10" height="14" viewBox="0 0 10 14" />
        </button>
      </div>
    </>
  );
};

export default YearsSlider;
