import styled from "styled-components";

const StatusItemContainer = styled.div`
  height: 100%;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ItemNumber = styled.div`
  font-size: 8rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #f5f6fa;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Kg = styled.div<{ exerciseName: string }>`
  font-size: 1rem;
  font-family: "Roboto Slab", serif;
  color: #f5f6fa;
  display: ${(props) => (props.exerciseName === "day" ? "none" : "block")};
`;

const ItemNumberExplanation = styled.div`
  font-size: 2rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #f5f6fa;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IStatusItem {
  weightSum: number;
  exerciseName: string;
}
function StatusItem(props: IStatusItem) {
  return (
    <StatusItemContainer>
      <ItemNumberContainer>
        <ItemNumber>{props.weightSum}</ItemNumber>
        <Kg exerciseName={props.exerciseName}>kg</Kg>
      </ItemNumberContainer>
      <ItemNumberExplanation>{props.exerciseName}</ItemNumberExplanation>
    </StatusItemContainer>
  );
}

export default StatusItem;
