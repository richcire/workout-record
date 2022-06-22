import { motion, useCycle } from "framer-motion";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import SideBarBtn from "./SideBarBtn";
import { useState } from "react";

const SideBarContainer = styled(motion.div)`
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  right: 0;

  height: 100vh;
  width: 400px;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 50px;
`;

const sideBarVariants = {
  open: {
    clipPath: "circle(2000px at 340px 60px)",
    transition: { type: "spring", duration: 2 },
  },
  closed: {
    clipPath: "circle(30px at 340px 60px)",
    transition: { delay: 0.5, type: "spring", stiffness: 400, damping: 40 },
  },
};

const CalendarContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  top: 20%;
  display: flex;
  justify-content: center;
`;

const calendarVariants = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
  closed: {
    opacity: 0,
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlayVariants = {
  open: {
    display: "flex",
  },
  closed: {
    display: "none",
  },
};

const RecordInputContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 80%;
  width: 80%;
`;

const ExitBtnContainer = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;
  background-color: transparent;
  border: none;
`;

function SideBar() {
  const [isOpen, cycleIsOpen] = useCycle(false, true);
  const [isDayClicked, cylceIsDayClicked] = useCycle(false, true);

  const [date, setDate] = useState(new Date());

  const onChange = (nextDate: Date) => {
    setDate(nextDate);
  };

  const onClickDay = (clickedDate: Date) => {
    console.log(clickedDate);
    cylceIsDayClicked();
  };

  return (
    <>
      <SideBarContainer
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sideBarVariants}
      >
        <SideBarBtn cycleIsOpen={cycleIsOpen} />
        <CalendarContainer variants={calendarVariants}>
          <Calendar onChange={onChange} value={date} onClickDay={onClickDay} />
        </CalendarContainer>
      </SideBarContainer>
      <Overlay
        initial={false}
        animate={isDayClicked ? "open" : "closed"}
        variants={overlayVariants}
      >
        <RecordInputContainer />
        <ExitBtnContainer onClick={() => cylceIsDayClicked()}>
          <svg width={23} height={23} viewBox="0 0 23 23">
            <path
              fill="transparent"
              strokeWidth="3"
              stroke="white"
              strokeLinecap="round"
              d="M 3 16.5 L 17 2.5"
            />
            <path
              fill="transparent"
              strokeWidth="3"
              stroke="white"
              strokeLinecap="round"
              d="M 3 2.5 L 17 16.346"
            />
          </svg>
        </ExitBtnContainer>
      </Overlay>
    </>
  );
}

export default SideBar;
