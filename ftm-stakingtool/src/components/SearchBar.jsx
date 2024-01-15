import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

function SearchBar(props) {

  const [address, setAddress] = useState("");

  function addressChange(event) {
    setAddress(event.target.value);
    console.log(event.target.value);
  }

  async function fetchTransaction() {
    try {
      const response = await axios.get("http://localhost:4000/txs", {
        params: { address: address },
      });
      response.data.response.result.forEach((transaction) => {
        if (transaction.input.slice(0, 10)==="0x"){
          transaction.input = "Transfer"
        }else if(transaction.input.slice(0, 10)==="0x9fa6dd35"){
          transaction.input = "Delegate"
        }else if(transaction.input.slice(0, 10)==="0x4f864df4"){
          transaction.input = "Undelegate"
        }else if(transaction.input.slice(0, 10)==="0xde67f215"){
          transaction.input = "Lock Stake"
        }else if(transaction.input.slice(0, 10)==="0x1d3ac42c"){
          transaction.input = "Unlock Stake"
        }else if(transaction.input.slice(0, 10)==="0x0962ef79"){
          transaction.input = "Claim Reward"
        }else if(transaction.input.slice(0, 10)==="0x08c36874"){
          transaction.input = "Restake Rewards"
        }
      });
      props.callBackTransaction(response.data.response.result);
      console.log(response.data.response.result);
    } catch (error) {
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
