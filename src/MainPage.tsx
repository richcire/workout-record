import styled from "styled-components";
import RecentRecords from "./components/RecentRecords";

import SideBar from "./components/SideBar";

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
