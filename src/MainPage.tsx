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
  border-top-left-radius: 40px;
  border-bottom-left-radius: 50px;
`;

const BtnContainer = styled.button`
  position: absolute;
  top: 30px;
  left: 310px;
  width: 60px;
  height: 60px;
  background-color: transparent;
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

interface IProps {
  variants: {
    closed: { d?: string; opacity?: number };
    open: { d?: string; opacity?: number };
  };
  d?: string;
  transition?: { duration: number };
}
const Path = (props: IProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const SideBarBtn = () => (
  <BtnContainer>
    <svg width={23} height={23} viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </BtnContainer>
);

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
        <BtnContainer onClick={() => cycleIsOpen()}>
          <svg width={23} height={23} viewBox="0 0 23 23">
            <Path
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
            />
            <Path
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
            />
            <Path
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
            />
          </svg>
        </BtnContainer>
      </SideBar>
    </Window>
  );
}

export default MainPage;
