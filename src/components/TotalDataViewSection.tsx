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

const Year = styled.div`
  font-size: 6rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
`;

const ShowDetailBtn = styled.button`
  height: 20px;
  width: 40px;
`;

const MonthCardContainer = styled.div`
  width: 90%;
  height: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;
`;

const MonthCard = styled.div`
  background-color: #1e3799;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f5f6fa;
`;

function TotalDataViewSection() {
  return (
    <SectionContainer>
      <YearHeaderContainer>
        <Year>2022</Year>
        <ShowDetailBtn />
      </YearHeaderContainer>
      <MonthCardContainer>
        {MONTHS_LIST.map((month) => (
          <MonthCard key={month}>{month}</MonthCard>
        ))}
      </MonthCardContainer>
    </SectionContainer>
  );
}

export default TotalDataViewSection;
