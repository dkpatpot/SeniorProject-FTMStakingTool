import express from "express";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import cors from "cors";

const app = express();
const port = 4000;
app.use(cors())
const chain = EvmChain.FANTOM;
const ftmAddress = "0xad29abb318791d579433d831ed122afeaf29dcfe";
app.get("/txs", async (req, res) => {
  try {
    
    const address = req.query.address;
    console.log(address);
    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address,
      chain,
    });
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(400).json();
  }
});
app.get("/ftmprice", async (req, res) => {
  try {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      "address": "0x4E15361FD6b4BB609Fa63C81A2be19d873717870",
      "chain": "0x1"
    });
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(400).json();
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
