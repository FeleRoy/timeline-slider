import React, { useCallback, useEffect, useRef } from "react";
import style from "./CircleButtons.module.scss";
import { gsap } from "gsap";

interface CircleButtonsProps {
  btnCount: number;
  radius?: number;
  rotationDuration?: number;
  buttonSize?: number;
  targetAngle?: number; // угол (в градусах), где должен быть активный элемент
  onBtnClick?: (index: number) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

//===============Эффекты на кнопку===========
const activeEffect = (btn: HTMLButtonElement | null) => {
  if (!btn) return;
  gsap.to(btn, { backgroundColor: "transparent", duration: 0.1 });
  gsap.to(btn, { scale: 1, duration: 0.5 });
};

const inactiveEffect = (btn: HTMLButtonElement | null) => {
  if (!btn) return;
  gsap.to(btn, { backgroundColor: "#42567A", duration: 0.1 });
  gsap.to(btn, { scale: 0.11, duration: 0.5 });
};
//===============Эффекты на кнопку===========

function foundAngle(index: number, angleStep: number) {
  const angleRad = index * angleStep;
  return (angleRad * 180) / Math.PI;
}

const getTargetRotationForIndex = (
  index: number,
  angleStep: number,
  targetAngle: number
) => {
  const angleDeg = foundAngle(index, angleStep);
  return targetAngle - angleDeg;
};

const CircleButtons: React.FC<CircleButtonsProps> = ({
  btnCount,
  radius = 265,
  rotationDuration = 0.8,
  buttonSize = 56,
  targetAngle = 300,
  onBtnClick,
  activeIndex,
  setActiveIndex,
}) => {
  const buttons = Array.from({ length: btnCount }, (_, index) =>
    (index + 1).toString()
  );
  if (buttons.length < 2 || buttons.length > 6) {
    throw new Error("количество кнопок от 2 до 6");
  }

  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const angleStep = (2 * Math.PI) / buttons.length;
  const currentRotationRef = useRef<number>(0);

  const animateToIndex = (index: number) => {
    const target = getTargetRotationForIndex(index, angleStep, targetAngle);
    const current = currentRotationRef.current;
    const delta = ((target - current + 540) % 360) - 180;
    const newRotation = current + delta;

    currentRotationRef.current = newRotation;

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotation: newRotation,
        duration: rotationDuration,
        ease: "power2.inOut",
      });
    }

    buttonsRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        rotation: -newRotation,
        duration: rotationDuration,
        ease: "power2.inOut",
      });
    });
  };

  useEffect(() => {
    const initRotation = getTargetRotationForIndex(
      activeIndex,
      angleStep,
      targetAngle
    );
    currentRotationRef.current = initRotation;

    if (containerRef.current) {
      gsap.set(containerRef.current, { rotation: initRotation });
    }
    buttonsRef.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { rotation: -initRotation });
    });

    if (buttonsRef.current[activeIndex]) {
      gsap.set(buttonsRef.current[activeIndex], {
        scale: 1,
        backgroundColor: "transparent",
      });
    }
  }, []);

  useEffect(() => {
    buttonsRef.current.forEach((btn, idx) => {
      if (!btn) return;
      if (idx === activeIndex) {
        activeEffect(btn);
      } else {
        inactiveEffect(btn);
      }
    });

    animateToIndex(activeIndex);
  }, [activeIndex]);

  const setButtonRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      buttonsRef.current[index] = el;
    },
    []
  );

  const handleMouseEnter = (index: number) => {
    if (index !== activeIndex) {
      activeEffect(buttonsRef.current[index]);
    }
  };

  const handleMouseLeave = (index: number) => {
    if (index !== activeIndex) {
      inactiveEffect(buttonsRef.current[index]);
    }
  };

  const handleButtonClick = (clickedIndex: number) => {
    if (activeIndex !== null && activeIndex !== clickedIndex) {
      inactiveEffect(buttonsRef.current[activeIndex]);
    }

    animateToIndex(clickedIndex);
    setActiveIndex(clickedIndex);
    onBtnClick?.(clickedIndex);
  };

  return (
    <div
      className={style.circle}
      ref={containerRef}
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
    >
      {buttons.map((button, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle) + radius - buttonSize / 2;
        const y = radius * Math.sin(angle) + radius - buttonSize / 2;
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
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "scale(0.11)",
              width: buttonSize,
              height: buttonSize,
            }}
          >
            {button}
          </button>
        );
      })}
    </div>
  );
};

export default CircleButtons;
