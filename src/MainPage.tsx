import styled from "styled-components";

import SideBar from "./components/SideBar";

const NumberOfDays = styled.div`
  font-size: 8rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #341f97;
  width: 100%;
  text-align: center;
  position: relative;
  top: 5%;
`;

const Window = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #a0eeff;
`;

function MainPage() {
  return (
    <Window>
      <NumberOfDays>365</NumberOfDays>
      <SideBar />
    </Window>
  );
}

export default MainPage;
