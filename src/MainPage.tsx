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
import { data2022State } from "./atoms";
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
  const [numberOfDays, setNumberOfDays] = useState(0);

  const data2022Ref = collection(db, "2022");
  const fetchDataUpdateNumberOfDays = async () => {
    let dataCopy = {};
    let numberOfDaysCopy = 0;
    const dataSnapshot = await getDocs(data2022Ref);
    dataSnapshot.forEach((doc) => {
      dataCopy = { ...dataCopy, [doc.id]: doc.data() };
      numberOfDaysCopy += Object.keys(doc.data()).length;
    });
    setData2022(dataCopy);
    setNumberOfDays(numberOfDaysCopy);
  };

  useEffect(() => {
    fetchDataUpdateNumberOfDays();
  }, []);

  console.log(data2022);
  console.log(numberOfDays);
  return (
    <Window>
      <NumberOfDays>{numberOfDays}</NumberOfDays>
      <SideBar />
      <RecentRecords />
      <NumberOfDays>Graph</NumberOfDays>
      <NumberOfDays>Whole records</NumberOfDays>
    </Window>
  );
}

export default MainPage;
