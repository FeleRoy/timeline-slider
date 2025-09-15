import React from "react";
import styles from "./RoundButton.module.scss";
import LeftArrow from "@/assets/LeftArrow.svg";
import RightArrow from "@/assets/RightArrow.svg";

interface RoundButtonProps {
  onClick?: () => void;
  direction?: "<" | ">";
  disabled?: boolean;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  onClick,
  direction = ">",
  disabled,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <button className={styles.button} onClick={onClick} disabled={disabled}>
        {direction === "<" && (
          <LeftArrow className={styles.arrow} viewBox="0 0 10 14" />
        )}
        {direction === ">" && (
          <RightArrow className={styles.arrow} viewBox="0 0 10 14" />
        )}
      </button>
    </div>
  );
};

export default RoundButton;
