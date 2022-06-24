import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import ExerciseInputRow from "./ExerciseInputRow";

const Overlay = styled(motion.div)`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlayVariants = {
  open: {
    display: "flex",
  },
  closed: {
    display: "none",
  },
};

const RecordInputContainer = styled.form`
  position: relative;
  background-color: #7f8fa6;
  height: 80%;
  width: 500px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateViewer = styled.div`
  width: 100%;
  font-size: 40px;
  font-family: "Roboto Slab", serif;
  margin-bottom: 80px;
  margin-left: 40px;
  margin-top: 20px;
`;

const ExitBtnContainer = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;
  background-color: transparent;
  border: none;
`;

const UpdateBtn = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #487eb0;
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 10px;
`;

interface IRecordInputScreen {
  isDayClicked: boolean;
  cycleIsDayClicked: () => void;
  clickedDate: Date;
}

const listOfThreeExercises = ["Bench Press", "Squat", "Deadlift"];

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

interface IThreeExercicsesData {
  benchPress: string;
  squat: string;
  deadlift: string;
}

function RecordInputScreen(props: IRecordInputScreen) {
  const clikedDateToString = props.clickedDate.toString();
  const [day, month, date, year] = clikedDateToString.split(" ");
  const [threeExerciseData, setThreeExerciseDate] =
    useState<IThreeExercicsesData>({
      benchPress: "0",
      squat: "0",
      deadlift: "0",
    });

  const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setThreeExerciseDate({
      ...threeExerciseData,
      [name]: value,
    });
  };

  const onWeightDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(day, month, date, year);
  };

  return (
    <Overlay
      initial={false}
      animate={props.isDayClicked ? "open" : "closed"}
      variants={overlayVariants}
    >
      <RecordInputContainer onSubmit={onWeightDataSubmit}>
        <DateViewer>{props.clickedDate.toDateString()}</DateViewer>
        <RowContainer>
          <NameOfExercise>Bench Press</NameOfExercise>
          <WeightOfExercise
            name="benchPress"
            value={threeExerciseData?.benchPress}
            onChange={onWeightChange}
          />
        </RowContainer>
        <RowContainer>
          <NameOfExercise>Squat</NameOfExercise>
          <WeightOfExercise
            name="squat"
            value={threeExerciseData?.squat}
            onChange={onWeightChange}
          />
        </RowContainer>
        <RowContainer>
          <NameOfExercise>Deadlift</NameOfExercise>
          <WeightOfExercise
            name="deadlift"
            value={threeExerciseData?.deadlift}
            onChange={onWeightChange}
          />
        </RowContainer>
        <UpdateBtn type="submit">UPDATE</UpdateBtn>
      </RecordInputContainer>
      <ExitBtnContainer onClick={() => props.cycleIsDayClicked()}>
        <svg width={23} height={23} viewBox="0 0 23 23">
          <path
            fill="transparent"
            strokeWidth="3"
            stroke="white"
            strokeLinecap="round"
            d="M 3 16.5 L 17 2.5"
          />
          <path
            fill="transparent"
            strokeWidth="3"
            stroke="white"
            strokeLinecap="round"
            d="M 3 2.5 L 17 16.346"
          />
        </svg>
      </ExitBtnContainer>
    </Overlay>
  );
}

export default RecordInputScreen;
