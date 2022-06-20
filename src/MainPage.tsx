import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GoCalendar } from "react-icons/go";
import { useState } from "react";
import { motion, useCycle } from "framer-motion";

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

const SideBar = styled(motion.div)`
  background-color: whitesmoke;
  position: fixed;
  top: 0;
  right: 0;

  height: 100vh;
  width: 400px;
  border-top-left-radius: 80px;
  border-bottom-left-radius: 100px;
  /* clip-path: circle(500px at 340px 60px); */
`;

const SideBarBtn = styled.button`
  position: absolute;
  top: 30px;
  left: 310px;
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border: none;
  padding: 0;
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

function MainPage() {
  const [isOpen, cycleIsOpen] = useCycle(false, true);

  return (
    <Window>
      <NumberOfDays>365</NumberOfDays>
      <SideBar
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sideBarVariants}
      >
        <SideBarBtn onClick={() => cycleIsOpen()} />
      </SideBar>
    </Window>
  );
}

export default MainPage;
