import React, { useEffect, useRef, useState } from "react"
import styles from './AnimatedDate.module.scss'
import { gsap } from "gsap";


interface AnimatedDateProps {
    value: number;
    duration?: number;
    color?: 'blue' | 'red'
}


const AnimatedDate: React.FC<AnimatedDateProps> = ({value, duration = 0.5, color = 'blue'}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const obj = useRef({ val: value });
  const spanRef = useRef(null);

    useEffect(() => {
    gsap.to(obj.current, {
      val: value,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        setDisplayValue(Math.floor(obj.current.val));
      }
    });

  }, [value]);

  const numberClass = `${styles.number} ${styles[`number--${color}`]}`;

  return <span className={numberClass} ref={spanRef}>{displayValue}</span>;
}


export default AnimatedDate