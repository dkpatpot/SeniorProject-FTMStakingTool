import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

function SearchBar(props) {

  const [address, setAddress] = useState("");

  function addressChange(event) {
    setAddress(event.target.value);
  }

  async function fetchTransaction() {
    try {
      const response = await axios.get("http://localhost:4000/transaction", {
        params: { address: address }
      });
      props.callBackTransaction(response.data.response.result);
      let filteredTransaction = [];
      if (props.date != null){
            response.data.response.result.forEach((transaction) => {
              if (new Date(transaction.block_timestamp)>new Date(props.date)){
                  filteredTransaction.push(transaction);
              }
          });
          props.callBackTransaction(filteredTransaction);
      }
      console.log(response.data.response.result);
    } catch (error) {
      props.callBackTransaction([]);
      console.error("Error fetching transactions:", error);
    }
  }

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control "
        placeholder="Search by addresses, transactions, and blocks"
        aria-label="Search by addresses, transactions, and blocks"
        aria-describedby="basic-addon2"
        value={address}
        onChange={(event) => {
          addressChange(event);
        }}
      ></input>
      <div className="input-group-append">
        <button
          className="btn btn-warning"
          type="button"
          onClick={fetchTransaction}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
