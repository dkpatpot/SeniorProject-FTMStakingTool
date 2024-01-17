import express from "express";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import cors from "cors";
import axios from "axios";
const app = express();
const port = 4000;
app.use(cors());
const chain = EvmChain.FANTOM;
app.get("/txs", async (req, res) => {
  try {
    const address = req.query.address;
    console.log(address);
    const response =
      await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
        address,
        chain,
      });
    return res.status(200).json({ response });
  } catch (error) {
    rres.status(500).json({ error: error.message });
  }
});

app.get("/tracetsx", async (req, res) => {
  const url = "https://rpcapi-tracing.fantom.network";

  const requestData = {
    jsonrpc: "2.0",
    id: 1,
    method: "trace_transaction",
    params: [
      "0xf835000f4e15a70dc717c87be64ac4c5a9fde6b6140bcd31ce0f3157b63cc503",
    ],
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, requestData, { headers });
    return res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/gethistoricalmarketdata", async (req, res) => {
  const date = '22-01-2022';
  const params = {date:date};
  const baseUrl = 'https://api.coingecko.com/api/v3/coins/fantom/history';
  try { 
    const response = await axios.get(baseUrl, {params});
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/getcurrentprice", async (req, res) => {
  const baseUrl = 'https://api.coingecko.com/api/v3/coins/fantom';
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
    return res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
Moralis.start({
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjZlYzU0MmVhLTk5ODQtNDcwOC05MzkyLTJkMWQ4ZmNjYTdlMSIsIm9yZ0lkIjoiMzcyMjAzIiwidXNlcklkIjoiMzgyNTE1IiwidHlwZUlkIjoiZTcyNmRkZDMtZWQyNy00NTU4LWIyZTEtZWMwMzc3YTUwYWE2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDUyMzk2MTEsImV4cCI6NDg2MDk5OTYxMX0.nf6WsXNp9G0DinRfs69A4MLi8oghz7v98NkmyDpwN2Q",
}).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
