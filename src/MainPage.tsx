import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoCalendar } from "react-icons/go";
import { useState } from "react";
import { motion } from "framer-motion";

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

  .calendar {
    position: absolute;
    top: 20px;
    right: 2%;
  }
`;

// const SideBarContainer = styled.div<{ isSideBarVisible: boolean }>`
//   position: fixed;
//   display: ${(props) => (props.isSideBarVisible ? "flex" : "none")};
//   top: 0;
//   height: 100vh;
//   width: 100vw;
// `;

// const Overlay = styled.div`
//   background-color: rgba(0, 0, 0, 0.3);
//   width: 100%;
//   height: 100%;
// `;

const SideBar = styled(motion.div)`
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
`;

const variants = {
  open: { opacity: 1, x: 0 },
  close: { opacity: 0, x: "-100%" },
};

function MainPage() {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const onIconClick = () => {
    setIsSideBarVisible((current) => !current);
    console.log(isSideBarVisible);
  };

  return (
    <Window>
      <NumberOfDays>365</NumberOfDays>
      <GoCalendar className="calendar" size={50} onClick={onIconClick} />

      <SideBar
        animate={isSideBarVisible ? "open" : "close"}
        variants={variants}
      >
        <Calendar />
      </SideBar>
    </Window>
  );
}

export default MainPage;
