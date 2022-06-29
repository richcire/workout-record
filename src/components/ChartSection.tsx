import { useState } from "react";
import Chart from "react-apexcharts";
import { MonthView } from "react-calendar";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { data2022State, IData2022 } from "../atoms";
import { MONTHS_LIST, REVERSED_MONTHS_LIST } from "../constants";

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

const makeCategoriesMonth = (currentMonthIdx: number): string[] => {
  if (currentMonthIdx - 7 < 0) {
    return MONTHS_LIST.slice(currentMonthIdx - 7).concat(
      MONTHS_LIST.slice(0, currentMonthIdx + 1)
    );
  } else {
    return MONTHS_LIST.slice(0, currentMonthIdx);
  }
};

const makeCategoriesDate = (data2022: IData2022 | undefined): string[] => {
  if (typeof data2022 === "undefined") {
    return ["1", "2", "3", "4", "5", "6", "7", "8"];
  } else {
    let availableCategoryNumber = 8;
    let categoriesDate: string[] = [];
    const existingMonthsArray = Object.keys(data2022);

    for (const recentMonth of REVERSED_MONTHS_LIST) {
      if (existingMonthsArray.includes(recentMonth)) {
        const existingDatesArray = Object.keys(data2022[recentMonth]);
        const existingDatesArrayLen = existingDatesArray.length;
        if (existingDatesArrayLen >= availableCategoryNumber) {
          categoriesDate = existingDatesArray
            .sort()
            .slice(existingDatesArrayLen - availableCategoryNumber)
            .concat(categoriesDate);
          availableCategoryNumber = 0;
        } else {
          categoriesDate = existingDatesArray.sort().concat(categoriesDate);

          availableCategoryNumber -= existingDatesArrayLen;
        }

        if (availableCategoryNumber == 0) {
          return categoriesDate;
        }
      }
    }
    return categoriesDate;
  }
};

function ChartSection() {
  const data2022 = useRecoilValue(data2022State);
  const currentMonthIdx = new Date().getMonth();
  const chartCategoriesMonth = makeCategoriesMonth(currentMonthIdx);
  const chartCategoriesDate = makeCategoriesDate(data2022);
  console.log(chartCategoriesDate);

  const [chartCategories, setChartCategories] = useState<number[]>();
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: chartCategoriesMonth,
    },
  };
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
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
        <ChartOptionBtn>Total</ChartOptionBtn>
        <ChartOptionBtn>Bennch Press</ChartOptionBtn>
        <ChartOptionBtn>Squat</ChartOptionBtn>
        <ChartOptionBtn>Deadlift</ChartOptionBtn>
        <ChartOptionBtn>Month</ChartOptionBtn>
        <ChartOptionBtn>Day</ChartOptionBtn>
      </ChartOptionBtnContainer>
    </ChartContainer>
  );
}

export default ChartSection;
