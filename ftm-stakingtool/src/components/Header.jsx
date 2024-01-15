import React from "react";
import {
  BrowserRouter,
  Route,
  Link
} from "react-router-dom";

function Header() {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-lg-between">

        <img
            src="./assets/icons/fantomLogo.png"
            alt="Fantom logo"
            className="not-fluid logo-white"
          ></img>



          <ul className="nav d-flex justify-content-center py-3 pt-4">
            <li>
              <Link to="/" className="nav-link px-2 text-white"> Home </Link>
            </li>
            <li>
              <a href="https://fantom.foundation/" className="nav-link px-2 text-white">
                Features
              </a>
            </li>
            <li>
              <a href="https://fantom.foundation/" className="nav-link px-2 text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="https://fantom.foundation/" className="nav-link px-2 text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="https://fantom.foundation/" className="nav-link px-2 text-white">
                About
              </a>
            </li>
            <li>
            <Link to="/StakingCalculator" className="nav-link px-2 text-white"> StakingCalculator </Link>
            </li>
          </ul>
        <button type="button" className="btn btn-warning mt-2">Connect to wallet</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
