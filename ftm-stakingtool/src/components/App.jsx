import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestMultiPage from "../pages/TestMultiPage";
import Home from "../pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/testMultiPage" element={<TestMultiPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;