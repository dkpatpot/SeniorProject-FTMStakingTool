import express from "express";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import cors from "cors";
import Web3 from "web3";
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
    return res.status(400).json();
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
    return res.status(400).json();
  }
});
app.get("/tracetransaction", async (req, res) => {
  try {
    const web3 = new Web3("https://rpc.ankr.com/fantom/");
    web3.extend({
      methods: [
        {
          name: "parityTraceTx",
          call: "trace_transaction",
          params: 1,
          inputFormatter: [null],
        },
      ],
    });
    const response = await web3.parityTraceTx(
      "0xf835000f4e15a70dc717c87be64ac4c5a9fde6b6140bcd31ce0f3157b63cc503"
    );
    console.log(response);
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
