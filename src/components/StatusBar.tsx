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
`;

function StatusBar() {
  const [data2022, setData2022] = useRecoilState(data2022State);

  const calculateThreeWeightSum = (
    weightData: IData2022 | undefined
  ): number[] => {
    if (typeof weightData === "undefined") {
      return [0, 0, 0];
    } else {
      let benchPressWeightSum = 0;
      let squatWeightSum = 0;
      let deadliftWeightSum = 0;
      for (const month in weightData) {
        for (const date in weightData[month]) {
          benchPressWeightSum += parseInt(weightData[month][date].benchPress);
          squatWeightSum += parseInt(weightData[month][date].squat);
          deadliftWeightSum += parseInt(weightData[month][date].deadlift);
        }
      }
      return [benchPressWeightSum, squatWeightSum, deadliftWeightSum];
    }
  };

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

  const [benchPressWeightSum, squatWeightSum, deadliftWeightsum] = useMemo(
    () => calculateThreeWeightSum(data2022),
    [data2022]
  );

  const numberOfDaysExercised = useMemo(
    () => calculateNumberOfDaysExercised(data2022),
    [data2022]
  );
  return (
    <StatusBarContainer>
      <StatusItem weightSum={numberOfDaysExercised} exerciseName="Day" />
      <StatusItem weightSum={benchPressWeightSum} exerciseName="Bench Press" />
      <StatusItem weightSum={squatWeightSum} exerciseName="Squat" />
      <StatusItem weightSum={deadliftWeightsum} exerciseName="Deadlift" />
    </StatusBarContainer>
  );
}

export default StatusBar;
