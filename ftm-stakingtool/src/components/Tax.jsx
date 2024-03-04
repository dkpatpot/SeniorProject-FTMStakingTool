import React, { useState, useEffect } from "react";
import axios from "axios";
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
  async function clearMemory() {
    setTotalFtmStake(0);
    setTotalFtmStakePrice(0);
    setTotalClaimReward(0);
    setTotalClaimRewardPrice(0);
    setTotalTokenWithdraw(0);
    setTotalTokenWithdrawPrice(0);
    setTotalRestake(0);
    setTotalFtmStakePrice(0);
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
      <div className="px-4 my-5 text-center">
        <button
          className="btn btn-warning m-2"
          type="button"
          onClick={calculateTax}
        >
          Calculate Taxes
        </button>
        <button
          className="btn btn-warning m-2"
          type="button"
          onClick={clearMemory}
        >
          Clear Memory
        </button>
      </div>
      {isTaxCalculated ? (
        <div className="container my-5">
          <div className="p-5 text-center bg-body-tertiary rounded-3">
            <h3>totalFtmStake {totalFtmStake} FTM</h3>
            <h3>totalFtmStakePrice {totalFtmStakePrice} USD</h3>
            <h3>totalClaimReward {totalClaimReward} FTM</h3>
            <h3>totalClaimRewardPrice {totalClaimRewardPrice} USD</h3>
            <h3>totalTokenWithdraw {totalTokenWithdraw} FTM</h3>
            <h3>totalTokenWithdrawPrice {totalTokenWithdrawPrice} USD</h3>
            <h3>totalRestake {totalRestake} FTM</h3>
            <h3>totalRestakePrice {totalRestakePrice} USD</h3>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Tax;
