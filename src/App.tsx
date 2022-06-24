import React from "react";
import { RecoilRoot } from "recoil";
import { Reset } from "styled-reset";
import MainPage from "./MainPage";

function App() {
  return (
    <>
      <RecoilRoot>
        <Reset />
        <MainPage />
      </RecoilRoot>
    </>
  );
}

export default App;
