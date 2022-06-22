import React, { useState } from "react";
import styled from "styled-components";

const RowContainer = styled.form`
  display: flex;
  width: 80%;
  height: 30px;
`;

const NameOfExercise = styled.div`
  background-color: whitesmoke;
  border: none;
  border-radius: 8px;
  width: 200px;
  height: 50px;
`;

const WeightOfExercise = styled.input`
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
      <NameOfExercise>Bench Press</NameOfExercise>
      <WeightOfExercise />
    </RowContainer>
  );
}

export default ExerciseInputRow;
