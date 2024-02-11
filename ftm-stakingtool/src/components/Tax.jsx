import React, { useState,useEffect } from "react";
import axios from "axios";
function Tax(props) {
    useEffect(() => {
      fetchHistoryData();
    },[]);
  const wei = 1000000000000000000;
  let [ftmPriceHistorical, setFtmPriceHistorical] = useState('');
  let [ftmPrice,setFtmPrice] = useState(0);
  let [totalFtmStake, setTotalFtmStake] = useState(0);
  let [totalStakePrice, setTotalStakePrice] = useState(0);
  let [totalClaimReward, setTotalClaimReward] = useState(0);
  let [totalClaimRewardPrice, setTotalClaimRewardPrice] = useState(0);
  let [totalTokenWithdraw,setTotalTokenWithdraw] = useState(0);
  let [totalTokenWithdrawPrice,setTotalTokenWithdrawPrice] = useState(0);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString();
    const month = (date.getUTCMonth() + 1).toString(); // Month is zero-based
    const year = date.getUTCFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }
  function queryDate(dateString){
    let result;
    ftmPriceHistorical.forEach(ftmPrice => {
      if (ftmPrice[0] === dateString){
        result = ftmPrice[2];
      }
    });
    return result;
  }
  async function fetchHistoryData(){
    let ftmPriceList = await axios.get('http://localhost:4000/readHistoricalCSVFile');
    setFtmPriceHistorical(ftmPriceList.data);
  }
  
  async function calculateTax() {
    props.transactionList.forEach(async (transaction) => {
      if (transaction.decoded_call === null) {
      }
      else if(transaction.decoded_call.label === "delegate"){
          let ftmValue = transaction.value/wei;
          console.log(formatDate(transaction.block_timestamp));
          let historicalPrice = queryDate(formatDate(transaction.block_timestamp));
          console.log(historicalPrice);
          setTotalFtmStake(totalFtmStake+=ftmValue);
          let totalPrice = historicalPrice*ftmValue;
          setTotalStakePrice(totalStakePrice+=totalPrice);
          
        }
      // else if (transaction.decoded_call.label === "claimRewards") {
      //   let traceTransaction = await props.traceTxs(transaction.hash);
      //   let arrayLength = traceTransaction.length - 1;
      //   let claimRewards = traceTransaction[arrayLength].action.value;
      //   let historicalPrice = await props.getHistoricalPrice(
      //     formatDate(transaction.block_timestamp)
      //   );
      //   setTotalClaimReward(
      //     (totalClaimReward += parseInt(claimRewards, 16) / wei)
      //   );
      //   setTotalClaimRewardPrice(
      //     (totalClaimRewardPrice +=
      //       (historicalPrice * parseInt(claimRewards, 16)) / wei)
      //   );
      // }
      // else if(transaction.decoded_call.label === "withdraw"){
      //   let traceTransaction = await props.traceTxs(transaction.hash);
      //   let arrayLength = traceTransaction.length - 1;
      //   let ftmWithdraw = traceTransaction[arrayLength].action.value;
      //   setTotalTokenWithdraw(totalTokenWithdraw+= parseInt(ftmWithdraw, 16) / wei);
      //   const response = await axios.get("http://localhost:4000/getcurrentprice");
      //   setFtmPrice(response.data.market_data.current_price.usd);
      //   setTotalTokenWithdrawPrice(totalTokenWithdrawPrice+=(ftmPrice*parseInt(ftmWithdraw, 16) / wei));
      // }
    });
    // console.log(totalTokenWithdraw);
    // console.log(totalClaimReward);
    // console.log(totalClaimRewardPrice);
    console.log(totalStakePrice);
    console.log(totalFtmStake);
    // console.log(totalTokenWithdrawPrice);
  }
  return (
    <div className="px-4 my-5 text-center">
      <button className="btn btn-warning" type="button" onClick={calculateTax}>
        Calculate Taxes
      </button>
    </div>
  );
}
export default Tax;
