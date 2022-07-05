import { useMemo } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { data2022State, IData2022 } from "../atoms";
import StatusItem from "./StatusItem";

const StatusBarContainer = styled.div`
  width: 80%;
  height: 240px;
  background-color: rgba(12, 36, 97, 0.9);
  border-radius: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
`;

interface IStatusBar {
  recentBenchPress: number;
  recentSquat: number;
  recentDeadlift: number;
}
function StatusBar(props: IStatusBar) {
  const [data2022, setData2022] = useRecoilState(data2022State);

  const calculateNumberOfDaysExercised = (
    weightData: IData2022 | undefined
  ): number => {
    if (typeof weightData === "undefined") {
      return 0;
    } else {
      let numberOfDays = 0;
      for (const month in weightData) {
        numberOfDays += Object.keys(weightData[month]).length;
      }
      return numberOfDays;
    }
  };

  const numberOfDaysExercised = useMemo(
    () => calculateNumberOfDaysExercised(data2022),
    [data2022]
  );

  return (
    <StatusBarContainer>
      <StatusItem weightSum={numberOfDaysExercised} exerciseName="Day" />
      <StatusItem
        weightSum={props.recentBenchPress}
        exerciseName="Bench Press"
      />
      <StatusItem weightSum={props.recentSquat} exerciseName="Squat" />
      <StatusItem weightSum={props.recentDeadlift} exerciseName="Deadlift" />
    </StatusBarContainer>
  );
}

export default StatusBar;
