import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoCalendar } from "react-icons/go";
import { useState } from "react";

const Window = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #a0eeff;

  .calendar {
    position: absolute;
    top: 20px;
    right: 2%;
  }
`;

const SideBarContainer = styled.div<{ isSideBarVisible: boolean }>`
  position: fixed;
  display: ${(props) => (props.isSideBarVisible ? "flex" : "none")};
  top: 0;
  height: 100vh;
  width: 100vw;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 80%;
  height: 100%;
`;

const SideBar = styled.div`
  right: 0;
  top: 0;
  background-color: whitesmoke;
  height: 100%;
  width: 350px;
`;

const NumberOfDays = styled.div`
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  color: #341f97;
  width: 100%;
  text-align: center;
`;

function MainPage() {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const onIconClick = () => {
    setIsSideBarVisible((current) => !current);
    console.log(isSideBarVisible);
  };

  return (
    <Window>
      <NumberOfDays>number of days</NumberOfDays>
      <GoCalendar className="calendar" size={50} onClick={onIconClick} />
      <SideBarContainer isSideBarVisible={isSideBarVisible}>
        <Overlay onClick={onIconClick} />
        <SideBar>
          <Calendar />
        </SideBar>
      </SideBarContainer>
    </Window>
  );
}

export default MainPage;
