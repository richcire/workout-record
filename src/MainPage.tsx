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

  const data2022Ref = collection(db, "2022");

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
  ): number => {
    if (typeof weightData === "undefined") {
      return 0;
    } else {
      let totalWeightSum = 0;

      for (const month in weightData) {
        for (const date in weightData[month]) {
          totalWeightSum +=
            parseInt(weightData[month][date].benchPress) +
            parseInt(weightData[month][date].squat) +
            parseInt(weightData[month][date].deadlift);
        }
      }
      return totalWeightSum;
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

  return (
    <Window>
      <Header>
        <HeaderTitle>3 대</HeaderTitle>
        <TotalWeight>{threeWeightSum}</TotalWeight>
      </Header>
      <StatusBar />
      <SideBar />
      <RecentRecords />
    </Window>
  );
}

export default MainPage;
