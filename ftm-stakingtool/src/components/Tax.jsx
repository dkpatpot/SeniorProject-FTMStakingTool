import React, { useState, useEffect } from "react";
import axios from "axios";
import TaxTable from "./TaxTable";
function Tax(props) {
  useEffect(() => {
    fetchHistoryData();
  }, []);
  const wei = 1000000000000000000;
  let [ftmPriceHistorical, setFtmPriceHistorical] = useState("");
  let [totalFtmStake, setTotalFtmStake] = useState(0);
  let [totalFtmStakePrice, setTotalFtmStakePrice] = useState(0);
  let [totalClaimReward, setTotalClaimReward] = useState(0);
  let [totalClaimRewardPrice, setTotalClaimRewardPrice] = useState(0);
  let [totalTokenWithdraw, setTotalTokenWithdraw] = useState(0);
  let [totalTokenWithdrawPrice, setTotalTokenWithdrawPrice] = useState(0);
  let [totalRestake, setTotalRestake] = useState(0);
  let [totalRestakePrice, setTotalRestakePrice] = useState(0);
  let [isTaxCalculated, setIsTaxCalculated] = useState(false);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString();
    const month = (date.getUTCMonth() + 1).toString();
    const year = date.getUTCFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }
  function disableButton(){
    document.getElementById("calculateTax").disabled = true;
    document.getElementById("clearTax").disabled = false;
  }
  function enableButton(){
    document.getElementById("calculateTax").disabled = false;
    document.getElementById("clearTax").disabled = true;
  }
  async function clearMemory() {
    enableButton();
    setTotalFtmStake(0);
    setTotalFtmStakePrice(0);
    setTotalClaimReward(0);
    setTotalClaimRewardPrice(0);
    setTotalTokenWithdraw(0);
    setTotalTokenWithdrawPrice(0);
    setTotalRestake(0);
    setTotalRestakePrice(0);
    setIsTaxCalculated(false);
  }
  function queryDate(dateString) {
    let result;
    ftmPriceHistorical.forEach((ftmPrice) => {
      if (ftmPrice[0] === dateString) {
        result = ftmPrice[2];
      }
    });
    return result;
  }
  async function fetchHistoryData() {
    let ftmPriceList = await axios.get(
      "http://localhost:4000/readHistoricalCSVFile"
    );
    setFtmPriceHistorical(ftmPriceList.data);
  }

  async function calculateTax() {
    disableButton();
    let currentDate = new Date().toJSON().slice(0, 10);
    let currentPrice = queryDate(formatDate(currentDate));
    props.transactionList.forEach(async (transaction) => {
      if (transaction.decoded_call === null) {
      } else if (transaction.decoded_call.label === "delegate") {
        let historicalPrice = queryDate(
          formatDate(transaction.block_timestamp)
        );
        let ftmValue = transaction.value / wei;
        let totalPrice = historicalPrice * ftmValue;
        setTotalFtmStake((totalFtmStake += ftmValue));
        setTotalFtmStakePrice((totalFtmStakePrice += totalPrice));
      } else if (transaction.decoded_call.label === "claimRewards") {
        let historicalPrice = queryDate(
          formatDate(transaction.block_timestamp)
        );
        let traceTransaction = await props.traceTxs(transaction.hash);
        let arrayLength = traceTransaction.length - 1;
        let claimRewards = traceTransaction[arrayLength].action.value;
        let claimRewardsFTM = parseInt(claimRewards, 16) / wei;
        let claimRewardsPrice =
          historicalPrice * (parseInt(claimRewards, 16) / wei);
        setTotalClaimReward((totalClaimReward += claimRewardsFTM));
        setTotalClaimRewardPrice((totalClaimRewardPrice += claimRewardsPrice));
      } else if (transaction.decoded_call.label === "withdraw") {
        let traceTransaction = await props.traceTxs(transaction.hash);
        let arrayLength = traceTransaction.length - 1;
        let ftmWithdraw = traceTransaction[arrayLength].action.value;
        setTotalTokenWithdraw(
          (totalTokenWithdraw += parseInt(ftmWithdraw, 16) / wei)
        );
        setTotalTokenWithdrawPrice(
          (totalTokenWithdrawPrice +=
            (currentPrice * parseInt(ftmWithdraw, 16)) / wei)
        );
      } else if (transaction.decoded_call.label === "restakeRewards") {
        let historicalPrice = queryDate(
          formatDate(transaction.block_timestamp)
        );
        let result = await props.getTxsLogs(transaction.block_hash);
        let restakePrice = result[0].data;
        setTotalRestake((totalRestake += parseInt(restakePrice, 16) / wei));
        setTotalRestakePrice(
          (totalRestakePrice +=
            (historicalPrice * parseInt(restakePrice, 16)) / wei)
        );
      }
      setIsTaxCalculated(true);
    });
  }
  return (
    <div>
      {isTaxCalculated ? (<TaxTable totalFtmStake={totalFtmStake} totalFtmStakePrice={totalFtmStakePrice} totalClaimReward={totalClaimReward} totalClaimRewardPrice={totalClaimRewardPrice} totalTokenWithdraw={totalTokenWithdraw} totalTokenWithdrawPrice={totalTokenWithdrawPrice} totalRestake={totalRestake} totalRestakePrice={totalRestakePrice} capitalgainTax={props.capitalgainTax} incomeTax={props.incomeTax}/>
      ) : (
        <div></div>
      )}
      <div className="px-4 my-5 text-center">
        <button
          id="calculateTax"
          className="btn btn-warning m-2"
          type="button"
          onClick={calculateTax}
        >
          Calculate Tax
        </button>
        <button
          id="clearTax"
          className="btn btn-warning m-2"
          type="button"
          onClick={clearMemory}
        >
          Clear Tax
        </button>
      </div>
    </div>
  );
}
export default Tax;
