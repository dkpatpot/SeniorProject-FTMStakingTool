import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-lg-between">
          <Link to="/">
            {" "}
            <img
              src="./assets/icons/fantomLogo.png"
              alt="Fantom logo"
              className="not-fluid logo-white"
            ></img>{" "}
          </Link>

          <ul className="nav d-flex justify-content-center py-3 pt-4">
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                {" "}
                Home{" "}
              </Link>
            </li>
            <li>
              <a
                href="https://fantom.foundation/"
                className="nav-link px-2 text-white"
              >
                Fantom
              </a>
            </li>
            <li>
              <Link to="/pricing" className="nav-link px-2 text-white">
                {" "}
                Pricing{" "}
              </Link>
            </li>
            <li>
              <Link
                to="/stakingcalculator"
                className="nav-link px-2 text-white"
              >
                {" "}
                TaxCalculator{" "}
              </Link>
            </li>
            <li>
              <Link to="/optimalstaking" className="nav-link px-2 text-white">
                {" "}
                OptimalStaking{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
