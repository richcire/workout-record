import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { MONTHS_LIST } from "../constants";

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const YearHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;
`;

const Year = styled.button`
  font-size: 6rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;

const MonthCardContainer = styled(motion.div)`
  width: 90%;
  height: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  column-gap: 20px;
`;

const MonthCard = styled.div`
  background-color: #1e3799;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f6fa;
  height: 80%;
  font-family: "Roboto Slab", serif;
  font-size: 40px;
`;

const monthCardContainerVariants = {
  open: {
    height: "800px",
  },
  closed: {
    height: "0px",
  },
};

function TotalDataViewSection() {
  const [isMonthCardContainerOpen, setIsMonthCardContainerOpen] =
    useState(false);
  const onYearClick = () => {
    setIsMonthCardContainerOpen((current) => !current);
  };

  return (
    <SectionContainer>
      <YearHeaderContainer>
        <Year
          onClick={() => {
            setIsMonthCardContainerOpen((current) => !current);
          }}
        >
          2022
        </Year>
      </YearHeaderContainer>
      <MonthCardContainer
        animate={isMonthCardContainerOpen ? "open" : "closed"}
        variants={monthCardContainerVariants}
      >
        {MONTHS_LIST.map((month) => (
          <MonthCard key={month}>{month}</MonthCard>
        ))}
      </MonthCardContainer>
    </SectionContainer>
  );
}

export default TotalDataViewSection;
