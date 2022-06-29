import { useState } from "react";
import Chart from "react-apexcharts";
import { MonthView } from "react-calendar";
import styled from "styled-components";
import { MONTHS_LIST } from "../constants";

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

function ChartSection() {
  const currentMonthIdx = new Date().getMonth();
  const chartCategoriesMonth = makeCategoriesMonth(currentMonthIdx);
  console.log(chartCategoriesMonth);

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
