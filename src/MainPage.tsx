import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
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
  const data2022Ref = collection(db, "2022");
  const getDataFromFirestore = async () => {
    const dataSnapshot = await getDocs(data2022Ref);
    dataSnapshot.forEach((doc) => {
      setData2022({
        ...data2022,
        [doc.id]: doc.data(),
      });
    });
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);
  console.log(data2022);
  return (
    <Window>
      <NumberOfDays>365</NumberOfDays>
      <SideBar />
      <RecentRecords />
      <NumberOfDays>Graph</NumberOfDays>
      <NumberOfDays>Whole records</NumberOfDays>
    </Window>
  );
}

export default MainPage;
