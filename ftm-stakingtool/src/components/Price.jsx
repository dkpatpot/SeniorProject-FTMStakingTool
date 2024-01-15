import React, { useState,useEffect } from "react";
import axios from "axios";
function Price() {
  const [ftmprice, setFtmprice] = useState();
  function formatValue(value){
    return Math.round(value*100000)/100000
  }
  async function fetchPrice() {
    try {
      const response = await axios.get("http://localhost:4000/ftmprice");
      const price = response.data.response.usdPrice;
      console.log(response);
      setFtmprice(formatValue(price));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // useEffect(() => {
  //   fetchPrice();
  //   const interval = setInterval(() => {
  //       fetchPrice();
  //     }, 150000);
  //     return () => clearInterval(interval);
  //   }, []);
  return (
    <div>
      <div className="container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <h1 className="text-body-emphasis">FTM token price</h1>
          <h3>{ftmprice} USD</h3>
          <p className="lead">
            <button
              className="btn btn-warning"
              type="button"
              onClick={fetchPrice}
            >Check Price
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Price;
