import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const RowContainer = styled.div`
  display: flex;
  width: 80%;
  height: 30px;
  margin-bottom: 100px;
`;

const NameOfExercise = styled.div`
  background-color: whitesmoke;
  border: none;
  border-radius: 8px;
  width: 170px;
  height: 50px;
  font-size: 30px;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

const WeightOfExercise = styled.input`
  background-color: #273c75;
  border: none;
  border-radius: 8px;
  width: 200px;
  height: 50px;
`;

interface IExerciseInputRow {
  exerciseName: string;
}

function ExerciseInputRow(props: IExerciseInputRow) {
  return (
    <RowContainer>
      <NameOfExercise>{props.exerciseName}</NameOfExercise>
      <WeightOfExercise />
    </RowContainer>
  );
}

export default ExerciseInputRow;
