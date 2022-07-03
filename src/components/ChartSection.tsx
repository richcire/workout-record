import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { MonthView } from "react-calendar";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { data2022State, IData2022 } from "../atoms";
import { MONTHS_LIST, REVERSED_MONTHS_LIST } from "../constants";
import {
  calculateWeightSumOfTheDay,
  changeMonthToInt,
  makeCategoriesDate,
  makeCategoriesMonth,
  returnDataDependOnBtnType,
  returnLatestDateOfMonthData,
} from "../utils";

const ChartContainer = styled.div`
  display: flex;
  margin-top: 200px;
  margin-bottom: 200px;
`;
const ChartOptionBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChartOptionBtn = styled.button``;

const onBtnClickedUponMonth = (
  data2022: IData2022,
  chartCategoriesMonth: string[],
  btnType: string
): number[] => {
  const chartData: number[] = [];
  const existingMonthsArray = Object.keys(data2022);

  for (const month of chartCategoriesMonth) {
    if (existingMonthsArray.includes(month)) {
      const recentDate = returnLatestDateOfMonthData(data2022[month]);
      const recentDateData = data2022[month][recentDate];
      chartData.push(returnDataDependOnBtnType(recentDateData, btnType));
    } else {
      chartData.push(0);
    }
  }
  return chartData;
};

const onBtnClickedUponDate = (data2022: IData2022, btnType: string) => {
  const dateData = [0, 0, 0, 0, 0, 0, 0, 0];
  const existingMonthsArray = Object.keys(data2022);
  let availableDataNumber = 8;

  for (const recentMonth of REVERSED_MONTHS_LIST) {
    if (existingMonthsArray.includes(recentMonth)) {
      const existingDatesArray = Object.keys(data2022[recentMonth]).sort();
      const existingDatesArrayLen = existingDatesArray.length;

      if (existingDatesArrayLen > availableDataNumber) {
        const availableDatesArray = existingDatesArray
          .slice(existingDatesArrayLen - availableDataNumber)
          .reverse();
        for (const date in availableDatesArray) {
          const recentDateData = data2022[recentMonth][date];
          dateData[availableDataNumber - 1] = returnDataDependOnBtnType(
            recentDateData,
            btnType
          );

          availableDataNumber -= 1;

          if (availableDataNumber === 0) {
            return dateData;
          }
        }
      } else {
        const availableDatesArray = existingDatesArray.reverse();
        console.log(availableDatesArray);
        for (const date of availableDatesArray) {
          const recentDateData = data2022[recentMonth][date];
          dateData[availableDataNumber - 1] = returnDataDependOnBtnType(
            recentDateData,
            btnType
          );

          availableDataNumber -= 1;

          if (availableDataNumber === 0) {
            return dateData;
          }
        }
      }

      if (availableDataNumber === 0) {
        return dateData;
      }
    }
  }
  return dateData;
};

const makeDateChartData = (dataType: string, chartCategories: string[]) => {};

function ChartSection() {
  const data2022 = useRecoilValue(data2022State);

  const currentMonthIdx = new Date().getMonth();
  const chartCategoriesMonth = makeCategoriesMonth(currentMonthIdx);
  const chartCategoriesDate = makeCategoriesDate(data2022);
  const [chartCategories, setChartCategories] =
    useState<string[]>(chartCategoriesMonth);

  const [isMonthCategoryOn, setIsMonthCategoryOn] = useState(true);
  const [chartDataStatus, setChartDataStatus] = useState<
    "total" | "benchPress" | "squat" | "deadlift"
  >("total");

  useEffect(() => {
    setChartData(
      onBtnClickedUponMonth(data2022, chartCategoriesMonth, "total")
    );
  }, [data2022]);

  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const onExerciseTypeBtnClicked = (
    exerciseType: "total" | "benchPress" | "squat" | "deadlift"
  ) => {
    setChartDataStatus(exerciseType);
    if (isMonthCategoryOn) {
      setChartData(
        onBtnClickedUponMonth(data2022, chartCategoriesMonth, exerciseType)
      );
    } else {
      setChartData(onBtnClickedUponDate(data2022, exerciseType));
    }
  };

  const onMonthBtnClicked = (
    exerciseType: "total" | "benchPress" | "squat" | "deadlift"
  ) => {
    setChartCategories(chartCategoriesMonth);
    setIsMonthCategoryOn(true);
    setChartData(
      onBtnClickedUponMonth(data2022, chartCategoriesMonth, exerciseType)
    );
  };
  const onDateBtnClicked = (
    exerciseType: "total" | "benchPress" | "squat" | "deadlift"
  ) => {
    setChartCategories(chartCategoriesDate);
    setIsMonthCategoryOn(false);
    setChartData(onBtnClickedUponDate(data2022, exerciseType));
  };

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: chartCategories,
    },
  };
  const series = [
    {
      name: "series-1",
      data: chartData,
    },
  ];

  return (
    <ChartContainer>
      <Chart
        options={options}
        series={series}
        type="line"
        width="350%"
        height="500"
      />
      <ChartOptionBtnContainer>
        <ChartOptionBtn onClick={() => onExerciseTypeBtnClicked("total")}>
          Total
        </ChartOptionBtn>
        <ChartOptionBtn onClick={() => onExerciseTypeBtnClicked("benchPress")}>
          Bennch Press
        </ChartOptionBtn>
        <ChartOptionBtn onClick={() => onExerciseTypeBtnClicked("squat")}>
          Squat
        </ChartOptionBtn>
        <ChartOptionBtn onClick={() => onExerciseTypeBtnClicked("deadlift")}>
          Deadlift
        </ChartOptionBtn>
        <ChartOptionBtn
          onClick={() => {
            onMonthBtnClicked(chartDataStatus);
          }}
        >
          Month
        </ChartOptionBtn>
        <ChartOptionBtn
          onClick={() => {
            onDateBtnClicked(chartDataStatus);
          }}
        >
          Date
        </ChartOptionBtn>
      </ChartOptionBtnContainer>
    </ChartContainer>
  );
}

export default ChartSection;
