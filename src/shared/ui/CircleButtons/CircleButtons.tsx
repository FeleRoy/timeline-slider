import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./CircleButtons.module.scss";
import { gsap } from "gsap";

interface CircleButtonsProps {
  buttons?: string[]; // от 2 до 6
  radius?: number;
  rotationDuration?: number;
  buttonSize?: number;
  startAngle?: number;
}

//===============Эффекты на кнопку===========
const activeEffect = (btn: HTMLButtonElement) => {
  gsap.to(btn, {
    backgroundColor: "transparent",
    duration: 0.1,
  });
  gsap.to(btn, { scale: 1, duration: 0.5 });
};

const inactiveEffect = (btn: HTMLButtonElement) => {
  gsap.to(btn, {
    backgroundColor: "#42567A",
    duration: 0.1,
  });
  gsap.to(btn, { scale: 0.11, duration: 0.5 });
};
//===============Эффекты на кнопку===========

const CircleButtons: React.FC<CircleButtonsProps> = ({
  buttons = ["1", "2", "3", "4", "5", "6"],
  radius = 265,
  rotationDuration = 0.8,
  buttonSize = 56,
  startAngle = -Math.PI / 4
}) => {
  if (buttons.length < 2 || buttons.length > 6) {
    throw new Error("количество кнопок от 2 до 6");
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const angleStep = (2 * Math.PI) / buttons.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (buttonsRef.current[activeIndex] && activeIndex != null) {
      gsap.set(buttonsRef.current[activeIndex], {
        scale: 1,
        backgroundColor: "transparent",
      });
    }
  }, []);

  const setButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      buttonsRef.current[index] = el;
    },
    []
  );

  //===============обработчики для кнопок===============
  const handleMouseEnter = (index: number) => {
    activeEffect(buttonsRef.current[index]);
  };

  const handleMouseLeave = (index: number) => {
    if (index != activeIndex) {
      inactiveEffect(buttonsRef.current[index]);
    }
  };

  const handleButtonClick = (clickedIndex: number) => {
    if (activeIndex !== null && activeIndex !== clickedIndex) {
      inactiveEffect(buttonsRef.current[activeIndex]);
    }

    const targetAngle =
      ((((clickedIndex + 1) * (angleStep) * 180) / Math.PI) % 360) + startAngle * 180 / Math.PI;
    gsap.to(containerRef.current, {
      rotation: -targetAngle,
      duration: rotationDuration,
      ease: "power2.inOut",
    });

    buttonsRef.current.forEach((element) => {
      if (element) {
        gsap.to(element, {
          rotation: targetAngle,
          duration: rotationDuration,
          ease: "power2.inOut",
        });
      }
    });
    setActiveIndex(clickedIndex);
  };
  //===============обработчики для кнопок===============

  return (
    <div
      className={style.circle}
      ref={containerRef}
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
    >
      {buttons.map((button, index) => {
        const angle = index * angleStep + startAngle;
        const x = radius * Math.cos(angle) + radius - buttonSize / 2 ;
        const y = radius * Math.sin(angle) + radius - buttonSize / 2 ;
        return (
          <button
            key={index}
            ref={setButtonRef(index)}
            onClick={() => {
              handleButtonClick(index);
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className={style.circle__button}
            style={{ left: `${x}px`, top: `${y}px`, transform: "scale(0.11)" }}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

export default CircleButtons;
