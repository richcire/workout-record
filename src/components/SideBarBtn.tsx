import { motion, useCycle } from "framer-motion";
import styled from "styled-components";

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

interface ISideBarBtn {
  cycleIsOpen: () => void;
}

function SideBarBtn(props: ISideBarBtn) {
  return (
    <BtnContainer onClick={() => props.cycleIsOpen()}>
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
}

export default SideBarBtn;
