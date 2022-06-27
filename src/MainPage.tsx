import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { data2022State, IData2022, recentExericiseDataState } from "./atoms";
import ChartSection from "./components/ChartSection";
import RecentRecords from "./components/RecentRecords";

import SideBar from "./components/SideBar";
import StatusBar from "./components/StatusBar";
import { db } from "./firebase-config";

const Window = styled.div`
  width: 100vw;
  background-color: #dcdde1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  width: 100%;
  height: 600px;
  background-color: #1e3799;
  clip-path: polygon(0 0, 100% 0%, 100% 76%, 0% 100%);
`;

const HeaderTitle = styled.div`
  font-size: 6rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #f5f6fa;
  width: 100%;
  text-align: center;
  padding-top: 30px;
`;
const TotalWeight = styled.div`
  font-size: 11rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #f5f6fa;
  width: 100%;
  text-align: center;
  padding-top: 60px;
`;

function MainPage() {
  const [data2022, setData2022] = useRecoilState(data2022State);
  const [recentExerciseData, setRecenteExerciseData] = useRecoilState(
    recentExericiseDataState
  );

  const data2022Ref = collection(db, "2022");

  const latestMonthsList = [
    "Dec",
    "Nov",
    "Oct",
    "Sep",
    "Aug",
    "Jul",
    "Jun",
    "May",
    "Apr",
    "Mar",
    "Feb",
    "Jan",
  ];

  const fetchDataUpdateNumberOfDays = async () => {
    let dataCopy = {};

    const dataSnapshot = await getDocs(data2022Ref);
    dataSnapshot.forEach((doc) => {
      dataCopy = { ...dataCopy, [doc.id]: doc.data() };
    });
    setData2022(dataCopy);
  };

  useEffect(() => {
    fetchDataUpdateNumberOfDays();
  }, []);

  const calculateThreeWeightSum = (
    weightData: IData2022 | undefined
  ): number[] => {
    if (typeof weightData === "undefined") {
      return [0, 0, 0];
    } else {
      let totalWeightSum = 0;
      let recentBenchPress = 0;
      let recentSquat = 0;
      let recentDeadlift = 0;

      const existingMonthsArray = Object.keys(weightData);
      for (const recentMonth of latestMonthsList) {
        if (existingMonthsArray.includes(recentMonth)) {
          // console.log(Object.keys(weightData[recentMonth]));
          const datesToIntList = Object.keys(weightData[recentMonth]).map(
            (data) => parseInt(data)
          );
          // console.log(datesToIntList);
          // console.log(Math.max(...datesToIntList));
          const recentDate = Math.max(...datesToIntList);
          console.log(weightData[recentMonth][recentDate]);
          // setRecenteExerciseData(weightData[recentMonth][recentDate]);
          // totalWeightSum +=
          recentBenchPress = parseInt(
            weightData[recentMonth][recentDate].benchPress
          );
          recentSquat = parseInt(weightData[recentMonth][recentDate].squat);
          recentDeadlift = parseInt(
            weightData[recentMonth][recentDate].deadlift
          );
          break;
        }
      }

      return [recentBenchPress, recentSquat, recentDeadlift];
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

  const [recentBenchPress, recentSquat, recentDeadlift] = useMemo(
    () => calculateThreeWeightSum(data2022),
    [data2022]
  );

  return (
    <Window>
      <Header>
        <HeaderTitle>3 대</HeaderTitle>
        <TotalWeight>{recentDeadlift}</TotalWeight>
      </Header>
      <StatusBar />
      <ChartSection />
      <SideBar />
      <RecentRecords />
    </Window>
  );
}

export default MainPage;
