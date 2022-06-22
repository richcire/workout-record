import { motion } from "framer-motion";
import styled from "styled-components";

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

const DateViewer = styled.div`
  font-size: 24px;
  font-family: "Roboto Slab", serif;
`;

const ExitBtnContainer = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;
  background-color: transparent;
  border: none;
`;

interface IRecordInputScreen {
  isDayClicked: boolean;
  cycleIsDayClicked: () => void;
  clickedDate: Date;
}

function RecordInputScreen(props: IRecordInputScreen) {
  return (
    <Overlay
      initial={false}
      animate={props.isDayClicked ? "open" : "closed"}
      variants={overlayVariants}
    >
      <RecordInputContainer>
        <DateViewer>{props.clickedDate.toString()}</DateViewer>
      </RecordInputContainer>
      <ExitBtnContainer onClick={() => props.cycleIsDayClicked()}>
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
  );
}

export default RecordInputScreen;
