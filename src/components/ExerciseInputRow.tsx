import React, { useState } from "react";
import styled from "styled-components";

const RowContainer = styled.form`
  display: flex;
  width: 80%;
  height: 30px;
  justify-content: space-between;
`;

const NameOfExercise = styled.input`
  background-color: whitesmoke;
  border: none;
  border-radius: 8px;
`;

const WeightOfExercise = styled.input`
  background-color: whitesmoke;
  border: none;
  border-radius: 8px;
  width: 50px;
`;

const SetNumber = styled.select`
  background-color: whitesmoke;
  border: none;
  border-radius: 8px;
  width: 40px;
`;

const TotalWeight = styled.div`
  background-color: whitesmoke;
  border: none;
  border-radius: 8px;
  width: 50px;
`;

function ExerciseInputRow() {
  const [selectedSetNum, setSelectedSetNum] = useState(3);
  const onSetNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <RowContainer>
      <NameOfExercise />
      <WeightOfExercise />
      <SetNumber onChange={onSetNumberChange}>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </SetNumber>
      <TotalWeight />
    </RowContainer>
  );
}

export default ExerciseInputRow;
