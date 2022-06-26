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
import { data2022State, IData2022 } from "./atoms";
import RecentRecords from "./components/RecentRecords";

import SideBar from "./components/SideBar";
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

const StatusBar = styled.div`
  width: 80%;
  height: 200px;
  background-color: rgba(12, 36, 97, 0.9);
  border-radius: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
`;

const NumberOfDays = styled.div`
  font-size: 9rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #f5f6fa;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberOfDaysExplanation = styled.div`
  font-size: 3rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #f5f6fa;
  width: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MainPage() {
  const [data2022, setData2022] = useRecoilState(data2022State);

  const data2022Ref = collection(db, "2022");

  const fetchDataUpdateNumberOfDays = async () => {
    let dataCopy = {};
    let numberOfDaysCopy = 0;
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
  ): number => {
    if (typeof weightData === "undefined") {
      return 0;
    } else {
      let totalWeight = 0;
      for (const month in weightData) {
        for (const date in weightData[month]) {
          totalWeight +=
            parseInt(weightData[month][date].benchPress) +
            parseInt(weightData[month][date].squat) +
            parseInt(weightData[month][date].deadlift);
        }
      }
      return totalWeight;
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

  const threeWeightSum = useMemo(
    () => calculateThreeWeightSum(data2022),
    [data2022]
  );

  const numberOfDaysExercised = useMemo(
    () => calculateNumberOfDaysExercised(data2022),
    [data2022]
  );

  return (
    <Window>
      <Header>
        <HeaderTitle>3 대</HeaderTitle>
        <TotalWeight>{threeWeightSum}</TotalWeight>
      </Header>
      <StatusBar>
        <NumberOfDays>{numberOfDaysExercised}</NumberOfDays>
        <NumberOfDaysExplanation>Days</NumberOfDaysExplanation>
      </StatusBar>
      <SideBar />
      <RecentRecords />
      <NumberOfDays>{numberOfDaysExercised}</NumberOfDays>
      <NumberOfDays>3대 500</NumberOfDays>
    </Window>
  );
}

export default MainPage;
