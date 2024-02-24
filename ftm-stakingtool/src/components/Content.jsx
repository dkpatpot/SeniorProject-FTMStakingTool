import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TransactionTable from "./TransactionTable";
import axios from "axios";
import Tax from "./Tax";
function Content() {
  const [transactionList, setTransactionList] = useState([]);
  let [isTransactionlist, setIsTransactionList] = useState(false);
  function transactionListCallBack(data) {
    setTransactionList(data);
    setIsTransactionList(true);
  }
  function getTransaction() {
    console.log(transactionList);
  }
  async function traceTxs(transactionHash) {
    try {
      const response = await axios.get(
        "http://localhost:4000/tracetransaction", {
          params: { transactionHash: transactionHash }
        }
      );
      console.log(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error("Error trace transaction data:", error);
    }
  }
  async function getTxsLogs(blockHash) {
    try {
      const response = await axios.get("http://localhost:4000/getlogs", {
        params: { blockHash: blockHash }
      });
      console.log(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error("Error trace transaction data:", error);
    }
  }
  async function getHistoricalPrice(date) {
    try {
      const response = await axios.get(
        "http://localhost:4000/gethistoricalmarketdata", {
          params: { date: date }
        }
      );
      console.log(response.data.market_data.current_price.usd);
      return response.data.market_data.current_price.usd;
      
    } catch (error) {
      console.error("Error get historical data:", error);
    }
  }


  return (
    <div className="px-4 my-5 text-center">
      <div className="col-lg-4 mx-auto">
        <SearchBar callBackTransaction={transactionListCallBack} />
      </div>
      
      <div className="col-lg-8 mx-auto">
        <button
          className="btn btn-warning m-2"
          type="button"
          onClick={getTransaction}
        >
          Check transaction list
        </button>
        <button className="btn btn-warning m-2" type="button" onClick={() => traceTxs("0x3a08c4c5bed20cc07c56edbf9434e6d9ba1cdda03e8886817290ed0427fb2d4f")}>
          Trace transaction
        </button>
        <button
          className="btn btn-warning m-2"
          type="button"
          onClick={() => getHistoricalPrice("20-01-2024")}
        >
          Get historical price
        </button>
        <button className="btn btn-warning m-2" type="button" onClick={() => getTxsLogs("0x0003f5490000019467dd01e4f9159f7160bf442a54191deea2a3f64b305ac33f")}>
          Get transaction logs
        </button>
        {isTransactionlist ? <div><TransactionTable transactionList={transactionList} /><Tax transactionList={transactionList} traceTxs={traceTxs} getTxsLogs={getTxsLogs}/></div>:<div></div>}
      </div>
    </div>
  );
}

export default Content;
