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
`;
const SideContainer = styled.div`
  display: flex;
  position: fixed;
  right: 0;
  top: 0;
`;

const CalendarIconContainer = styled(motion.div)`
  width: 80px;
  height: 80px;
  background-color: whitesmoke;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;

const SideBar = styled(motion.div)`
  background-color: whitesmoke;

  height: 100%;
`;

const calendarVariants = {
  close: { opacity: 0, x: 1000, display: "none" },
  open: { opacity: 1, x: 0, display: "block" },
};

const iconVariants = {
  close: { x: 0 },
  open: { x: -10 },
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
      <SideContainer>
        <CalendarIconContainer
          initial={false}
          animate={isSideBarVisible ? "open" : "close"}
          variants={iconVariants}
        >
          <GoCalendar className="calendar" size={50} onClick={onIconClick} />
        </CalendarIconContainer>

        <SideBar
          initial={false}
          animate={isSideBarVisible ? "open" : "close"}
          variants={calendarVariants}
          transition={{ type: "tween" }}
        >
          <Calendar />
        </SideBar>
      </SideContainer>
    </Window>
  );
}

export default MainPage;
