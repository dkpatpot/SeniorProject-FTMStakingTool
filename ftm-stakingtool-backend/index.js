import express from "express";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import cors from "cors";

const app = express();
const port = 4000;
app.use(cors())
const chain = EvmChain.FANTOM;

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

Moralis.start({
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQzNmVlNjQ2LWI0YjUtNGE4OS1iZjk0LTVlZWJiYzIyYTM2MiIsIm9yZ0lkIjoiMzcxNzQ1IiwidXNlcklkIjoiMzgyMDQ4IiwidHlwZUlkIjoiMThlZTA2OWMtMzBkMS00ODMzLTg4ZWItNjlhYWMwZDgwMjFmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDQ5NzYwNTIsImV4cCI6NDg2MDczNjA1Mn0.mSutrkX_I0uOq-mIrN_69ID9ku3PjR7F6_-_Sumugxc",
}).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
