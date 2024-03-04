import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "./Title";
import { LineChart } from "@mui/x-charts/LineChart";

const FranceGDPperCapita = [];

export default function PriceChart() {
  let [ftmPriceHistorical, setFtmPriceHistorical] = useState();
  let [date, setDate] = useState([]);
  const [ftmprice, setFtmprice] = useState();
  useEffect(() => {
    fetchHistoryData();
  }, []);
  async function fetchHistoryData() {
    let ftmPriceList = await axios.get(
      "http://localhost:4000/readHistoricalCSVFile"
    );
    setFtmPriceHistorical(ftmPriceList.data);
  }
  function setData(){
    ftmPriceHistorical.forEach((data) => {
        date.push(data[0]);
    });
    console.log(date);
  }
  function formatValue(value) {
    return Math.round(value * 100000) / 100000;
  }
  async function fetchPrice() {
    try {
      const response = await axios.get("http://localhost:4000/getcurrentprice");
      const price = response.data.market_data.current_price.usd;
      setFtmprice(formatValue(price));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div>
      <LineChart
        xAxis={[
          {
            id: "Date",
            data: date,
          },
        ]}
        series={[
          {
            id: "France",
            label: "French GDP per capita",
            data: FranceGDPperCapita,
            stack: "total",
            area: false,
            showMark: false,
          },
        ]}
        width={600}
        height={400}
        margin={{ left: 70 }}
      />
        <button className="btn btn-warning m-2" type="button" onClick={() => setData()}>
          Add data
        </button>
    </div>
  );
}
