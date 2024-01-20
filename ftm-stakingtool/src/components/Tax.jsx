import React, { useState } from "react";
import axios from "axios";
function Tax(props) {
    const wei = 1000000000000000000;
    let [totalFtmStake,setTotalFtmStake] = useState(0);
    let [totalStakePrice,setTotalStakePrice] = useState(0);
    function formatDate(dateString){
        const date = new Date(dateString);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = date.getUTCFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;

    }
    async function calculateTax(){
        console.log(props.transactionList);
        props.transactionList.forEach(async transaction => {
            if(transaction.decoded_call === null){
            }else if(transaction.decoded_call.label === "delegate"){
                let ftmValue = transaction.value/wei;
                let historicalPrice = await props.getHistoricalPrice(formatDate(transaction.block_timestamp));
                setTotalFtmStake(totalFtmStake+=ftmValue);
                let totalPrice = historicalPrice*ftmValue;
                setTotalStakePrice(totalStakePrice+=totalPrice);
                console.log(totalStakePrice);
            }
        });
        
    }
  return (
    <div className="px-4 my-5 text-center">
      <button
        className="btn btn-warning"
        type="button"
        onClick={calculateTax}
      >
        Calculate Taxes
      </button>
    </div>
  );
}
export default Tax;
