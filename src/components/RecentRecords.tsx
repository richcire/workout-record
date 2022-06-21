import styled from "styled-components";

const CardsContainer = styled.div`
  background-color: beige;
  width: 80%;
  height: 400px;
  display: flex;
  justify-content: space-evenly;
`;

const Card = styled.div`
  width: 20%;
  height: 100%;
  background-color: azure;
  border-radius: 20px;
`;
function RecentRecords() {
  return (
    <CardsContainer>
      <Card />
      <Card />
      <Card />
      <Card />
    </CardsContainer>
  );
}

export default RecentRecords;
