import React, { useState } from "react";
import AnimatedDate from "@/shared/ui/AnimatedDate/AnimatedDate";
import CircleButtons from "@/shared/ui/CircleButtons/CircleButtons";
import RoundButton from "@/shared/ui/RoundButton/RoundButton";

interface HistoryPageProps {}

const HistoryPage: React.FC<HistoryPageProps> = ({}) => {
  return (
    <>
      
      <CircleButtons></CircleButtons>
      <RoundButton></RoundButton>
    </>
  );
};

export default HistoryPage;
