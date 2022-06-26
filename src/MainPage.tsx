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

const NumberOfDays = styled.div`
  font-size: 8rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #192a56;
  width: 100%;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 90px;
`;

const Window = styled.div`
  width: 100vw;
  background-color: #dcdde1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function MainPage() {
  const [data2022, setData2022] = useRecoilState(data2022State);
  // const [numberOfDays, setNumberOfDays] = useState(0);

  const data2022Ref = collection(db, "2022");
  const fetchDataUpdateNumberOfDays = async () => {
    let dataCopy = {};
    let numberOfDaysCopy = 0;
    const dataSnapshot = await getDocs(data2022Ref);
    dataSnapshot.forEach((doc) => {
      dataCopy = { ...dataCopy, [doc.id]: doc.data() };
      // numberOfDaysCopy += Object.keys(doc.data()).length;
    });
    setData2022(dataCopy);
    // setNumberOfDays(numberOfDaysCopy);
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
      <NumberOfDays>{numberOfDaysExercised}</NumberOfDays>
      <SideBar />
      <RecentRecords />
      <NumberOfDays>{threeWeightSum}</NumberOfDays>
      <NumberOfDays>Whole records</NumberOfDays>
    </Window>
  );
}

export default MainPage;
