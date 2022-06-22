import { motion } from "framer-motion";
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

const RecordInputContainer = styled.div`
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

function RecordInputScreen(props: IRecordInputScreen) {
  return (
    <Overlay
      initial={false}
      animate={props.isDayClicked ? "open" : "closed"}
      variants={overlayVariants}
    >
      <RecordInputContainer>
        <DateViewer>{props.clickedDate.toDateString()}</DateViewer>
        {listOfThreeExercises.map((exercise) => (
          <ExerciseInputRow exerciseName={exercise} />
        ))}
        <UpdateBtn />
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
