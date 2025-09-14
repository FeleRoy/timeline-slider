import React from "react";
import styles from "./BackgroundLines.module.scss"
import cn from 'classnames';

interface BackgroundLinesProps {

}

const BackgroundLines: React.FC<BackgroundLinesProps> = ({

}) => {
  return (
    <div className={styles.backlines}>
      <div className={cn(styles.line, styles.left)} />
      <div className={cn(styles.line, styles.right)}  />
      <div className={cn(styles.line, styles.horizontal)} />
      <div className={cn(styles.line, styles.vertical)} />
    </div>
  );
};

export default BackgroundLines;