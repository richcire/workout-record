import styled from "styled-components";

const Window = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #a0eeff;
`;
const NumberOfDays = styled.div`
  font-family: "Roboto Slab", serif;
`;

function MainPage() {
  return (
    <Window>
      <NumberOfDays>number of days</NumberOfDays>
    </Window>
  );
}

export default MainPage;
