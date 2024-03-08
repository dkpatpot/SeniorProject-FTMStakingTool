import express from "express";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import cors from "cors";
import axios from "axios";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
const app = express();
const port = 4000;
app.use(cors());
dotenv.config();
const chain = EvmChain.FANTOM;
app.get("/transaction", async (req, res) => {
  try {
    const address = req.query.address;
    console.log(address);
    const response =
      await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
        address,
        chain,
      });
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/tracetransaction", async (req, res) => {
  const url = "https://rpcapi-tracing.fantom.network";
  let transactionHash = req.query.transactionHash;
  const requestData = {
    jsonrpc: "2.0",
    id: 1,
    method: "trace_transaction",
    params: [transactionHash],
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, requestData, { headers });
    res.status(200).json(response.data); // Accessing response.data to get the actual data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/getlogs", async (req, res) => {
  const url = "https://rpcapi.fantom.network";
  const blockHash = req.query.blockHash;
  const requestData = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getLogs",
    params: [
      {
        address: ["0xfc00face00000000000000000000000000000000"],
        blockHash: blockHash,
      },
    ],
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, requestData, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/gethistoricalmarketdata", async (req, res) => {
  const date = req.query.date;
  const params = { date: date };
  const baseUrl = "https://api.coingecko.com/api/v3/coins/fantom/history";
  try {
    const response = await axios.get(baseUrl, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/getcurrentprice", async (req, res) => {
  const baseUrl = "https://api.coingecko.com/api/v3/coins/fantom";
  try {
    const response = await axios.get(baseUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/ftmprice", async (req, res) => {
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: "0x4E15361FD6b4BB609Fa63C81A2be19d873717870",
      chain: "0x1",
    });
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/readHistoricalCSVFile", (req, res) => {
  let results = [];
  fs.createReadStream("./data/ftmprice.csv")
    .pipe(
      csv({
        headers: false,
      })
    )
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.send(results);
    });
});
Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
}).then(() => {
  console.log(process.env.MORALIS_API_KEY);
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
