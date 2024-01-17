import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TransactionTable from "./TransactionTable";
import axios from "axios";
function Content() {
  const [transactionList, setTransactionList] = useState([]);
  function transactionListCallBack(data) {
    setTransactionList(data);
  }
  function getTransaction() {
    console.log(transactionList);
  }

  async function traceTxs() {
    try {
      const response = await axios.get(
        "http://localhost:4000/tracetransaction"
      );
      console.log(response.data.result);
    } catch (error) {
      console.error("Error trace transaction data:", error);
    }
  }
  async function getHistoricalPrice() {
    try {
      const response = await axios.get(
        "http://localhost:4000/gethistoricalmarketdata"
      );
      console.log(response.data.market_data.current_price.usd);
    } catch (error) {
      console.error("Error get historical data:", error);
    }
  }
  return (
    <div className="px-4 my-5 text-center">
      <div className="col-lg-8 mx-auto">
        <SearchBar callBackTransaction={transactionListCallBack} />
        <button
          className="btn btn-warning"
          type="button"
          onClick={getTransaction}
        >
          Check transaction list
        </button>
        <button className="btn btn-warning" type="button" onClick={traceTxs}>
          Trace transaction
        </button>
        <button className="btn btn-warning" type="button" onClick={getHistoricalPrice}>
          Get historical price
        </button>
        <TransactionTable transactionList={transactionList} />
      </div>
    </div>
  );
}

export default Content;
