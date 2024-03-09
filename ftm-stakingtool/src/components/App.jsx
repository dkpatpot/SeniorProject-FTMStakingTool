import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StakingCalulator from "../pages/StakingCalculator";
import OptimalStaking from "../pages/OptimalStaking";
import LandingPage from "../pages/LandingPage";
import Pricing from "../pages/Pricing";
import About from "../pages/About";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/stakingCalculator" element={<StakingCalulator/>}/>
        <Route path="/optimalstaking" element={<OptimalStaking/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;