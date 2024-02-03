import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import StakingCalulator from "../pages/StakingCalculator";
import OptimalStaking from "../pages/OptimalStaking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/StakingCalculator" element={<StakingCalulator/>}/>
        <Route path="/OptimalStaking" element={<OptimalStaking/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;