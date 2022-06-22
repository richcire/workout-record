import { motion, useCycle } from "framer-motion";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import SideBarBtn from "./SideBarBtn";

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

function SideBar() {
  const [isOpen, cycleIsOpen] = useCycle(false, true);
  return (
    <SideBarContainer
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sideBarVariants}
    >
      <SideBarBtn cycleIsOpen={cycleIsOpen} />
      <CalendarContainer variants={calendarVariants}>
        <Calendar />
      </CalendarContainer>
    </SideBarContainer>
  );
}

export default SideBar;
