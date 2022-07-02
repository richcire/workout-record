import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { MonthView } from "react-calendar";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { data2022State, IData2022 } from "../atoms";
import { MONTHS_LIST, REVERSED_MONTHS_LIST } from "../constants";
import {
  changeMonthToInt,
  makeCategoriesDate,
  makeCategoriesMonth,
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

const onTotalBtnClickedUponMonth = (
  data2022: IData2022,
  chartCategoriesMonth: string[]
): number[] => {
  const chartData: number[] = [];
  const existingMonthsArray = Object.keys(data2022);

  for (const month of chartCategoriesMonth) {
    if (existingMonthsArray.includes(month)) {
      const datesToIntList = Object.keys(data2022[month]).map((data) =>
        parseInt(data)
      );

      let recentDate: number | string = Math.max(...datesToIntList);
      console.log(recentDate);
      // 1 != "01"
      if (recentDate.toString().length === 1) {
        recentDate = "0" + recentDate;
      }
      const recentDateData = data2022[month][recentDate];
      console.log(recentDateData);
      chartData.push(
        parseInt(recentDateData.benchPress) +
          parseInt(recentDateData.squat) +
          parseInt(recentDateData.deadlift)
      );
    } else {
      chartData.push(0);
    }
  }
  console.log(chartData);
  return chartData;
};

// const makeMonthChartData = (
//   dataType: string,
//   chartCategories: string[]
// ): number[] => {
//   const data2022 = useRecoilValue(data2022State);
//   const chartData: number[] = [];
//   const existingMonthsArray = Object.keys(data2022);

//   if (dataType === "total") {
//     for (const targetMonth of chartCategories) {
//       if (existingMonthsArray.includes(targetMonth)) {
//         let average = 0;
//         for (const dateData in data2022[targetMonth]) {
//           average += parseInt(dateData);
//         }
//       } else {
//         chartData.push(0);
//       }
//     }
//   } else if (dataType == "benchPress") {
//   } else if (dataType == "squat") {
//   } else if (dataType == "deadLift") {
//   }

//   return chartData;
// };

const makeDateChartData = (dataType: string, chartCategories: string[]) => {};

function ChartSection() {
  const data2022 = useRecoilValue(data2022State);

  const currentMonthIdx = new Date().getMonth();
  const chartCategoriesMonth = makeCategoriesMonth(currentMonthIdx);
  const chartCategoriesDate = makeCategoriesDate(data2022);

  useEffect(() => {
    setChartData(onTotalBtnClickedUponMonth(data2022, chartCategoriesMonth));
  }, [data2022]);

  const [chartCategories, setChartCategories] =
    useState<string[]>(chartCategoriesMonth);

  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const onTotalBtnClicked = (data2022: IData2022 | undefined) => {
    if (typeof data2022 === "undefined") {
    }
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
        <ChartOptionBtn
          onClick={() =>
            onTotalBtnClickedUponMonth(data2022, chartCategoriesMonth)
          }
        >
          Total
        </ChartOptionBtn>
        <ChartOptionBtn>Bennch Press</ChartOptionBtn>
        <ChartOptionBtn>Squat</ChartOptionBtn>
        <ChartOptionBtn>Deadlift</ChartOptionBtn>
        <ChartOptionBtn
          onClick={() => setChartCategories(chartCategoriesMonth)}
        >
          Month
        </ChartOptionBtn>
        <ChartOptionBtn onClick={() => setChartCategories(chartCategoriesDate)}>
          Date
        </ChartOptionBtn>
      </ChartOptionBtnContainer>
    </ChartContainer>
  );
}

export default ChartSection;
