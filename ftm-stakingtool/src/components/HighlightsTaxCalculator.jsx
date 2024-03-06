import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import TransactionTable from "./TransactionTable";
import TaxDatePicker from "./TaxDatePicker";
import axios from "axios";
import Tax from "./Tax";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PercentIcon from "@mui/icons-material/Percent";
export default function HighlightsTaxCalculator() {
  let [date, setDate] = useState(null);
  const [transactionList, setTransactionList] = useState([]);
  let [isTransactionlist, setIsTransactionList] = useState(false);
  let [capitalgainTax, setCapitalGainTax] = useState(15);
  let [incomeTax, setIncomeTax] = useState(15);
  function transactionListCallBack(data) {
    setTransactionList(data);
    setIsTransactionList(true);
  }
  function DateCallBack(data) {
    setDate(data);
  }
  function capitalgainTaxChange(event) {
    const newValue = event.target.value;
    if (newValue>100){
        setCapitalGainTax(100);
    }else if(newValue<0){
        setCapitalGainTax(0);
    }else{
        setCapitalGainTax(newValue);
    }
  }
  function incomeTaxTaxChange(event) {
    const newValue = event.target.value;
    if (newValue>100){
        setIncomeTax(100);
    }else if(newValue<0){
        setIncomeTax(0);
    }else{
        setIncomeTax(newValue);
    }
  }
  async function traceTxs(transactionHash) {
    try {
      const response = await axios.get(
        "http://localhost:4000/tracetransaction",
        {
          params: { transactionHash: transactionHash },
        }
      );
      return response.data.result;
    } catch (error) {
      console.error("Error trace transaction data:", error);
    }
  }
  async function getTxsLogs(blockHash) {
    try {
      const response = await axios.get("http://localhost:4000/getlogs", {
        params: { blockHash: blockHash },
      });
      return response.data.result;
    } catch (error) {
      console.error("Error trace transaction data:", error);
    }
  }
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4">
            Fantom Tax Calculator
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Search transaction from your addresses.
          </Typography>
        </Box>
        <div className="row">
          <div className="col">
            <TaxDatePicker DateCallBack={DateCallBack} />
          </div>
          <div className="col p-0">
            <TextField
              label="Income tax"
              value={incomeTax}
              id="outlined-start-adornment"
              type="number"
              sx={{
                m: 1,
                width: "25ch",
                svg: { color: "#fff" },
                input: { color: "#fff" },
                label: { color: "#fff" },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      sx={{
                        color: "#fff",
                        backgroundColor: "#fff",
                      }}
                    >
                      <PercentIcon />
                    </div>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                min: 0,
                max: 100,
              }}
              onChange={(event) => {
                incomeTaxTaxChange(event);
              }}
            />
          </div>
          <div className="col p-0">
            <TextField
              type="number"
              label="Capital gain tax"
              id="outlined-start-adornment"
              value={capitalgainTax}
              sx={{
                m: 1,
                width: "25ch",
                svg: { color: "#fff" },
                input: { color: "#fff" },
                label: { color: "#fff" },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div
                      sx={{
                        color: "#fff",
                        backgroundColor: "#fff",
                      }}
                    >
                      <PercentIcon />
                    </div>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                min: 0,
                max: 100,
              }}
              onChange={(event) => {
                capitalgainTaxChange(event);
              }}
            />
          </div>
        </div>

        <div className="col-lg-12 mx-auto">
          <SearchBar
            callBackTransaction={transactionListCallBack}
            date={date}
          />
        </div>
        <div className="col-lg-12 mx-auto">
          {isTransactionlist ? (
            <div>
              <TransactionTable transactionList={transactionList} />
              <Tax
                transactionList={transactionList}
                traceTxs={traceTxs}
                getTxsLogs={getTxsLogs}
                capitalgainTax={capitalgainTax}
                incomeTax={incomeTax}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Container>
    </Box>
  );
}
