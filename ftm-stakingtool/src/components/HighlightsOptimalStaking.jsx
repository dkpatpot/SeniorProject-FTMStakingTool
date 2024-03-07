import {
  Box,
  Container,
  Grid,
  Input,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OptimalTable from "./OptimalTable";
import OptimalChart from "./OptimalChart";
import OptimalResult from "./OptimalResult";

function HighlightsOptimalStaking() {
  let [initialAmount, setInitialAmount] = useState(1000);
  let [stakingPeriod, setStakingPeriod] = useState(7);

  function changeInitialAmount(event) {
    const newInitailValue = event.target.value;
    if (newInitailValue > 10000000) {
      setInitialAmount(10000000);
    } else if (newInitailValue < 1) {
      setInitialAmount(1);
    } else {
      setInitialAmount(newInitailValue);
    }
    console.log(initialAmount);
  }
  const [value, setValue] = React.useState(7);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 7) {
      setValue(7);
    } else if (value > 365) {
      setValue(365);
    }
  };

  return (
    <div>
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
              Fantom Optimal Staking
            </Typography>
            <Typography variant="body1" sx={{ color: "grey.400" }}>
              Please type your initial amount and staking period.
            </Typography>
          </Box>
          <div className="row">
            <div className="col">
              <TextField
                required
                type="number"
                id="outlined-required"
                label="Initial Amount"
                defaultValue={initialAmount}
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
                onChange={(event) => {
                  changeInitialAmount(event);
                }}
              />
            </div>
            <div className="col mx-1">
              <Box sx={{ width: 500 }}>
                <Typography id="input-slider" gutterBottom>
                  Staking Period
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <div className="pt-1 mx-3">
                    <Grid item>
                      <CalendarTodayIcon />
                    </Grid>
                  </div>

                  <Grid item xs>
                    <Slider
                      value={typeof value === "number" ? value : 0}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                      max={365}
                      min={7}
                      size="medium"
                      valueLabelDisplay="on"
                      sx={{
                        my: 0,
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <Input
                      value={value}
                      size="small"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: 7,
                        max: 365,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                      sx={{
                        width: 100,
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
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Box sx={{ width: "100%" }}>
                <OptimalTable />
              </Box>
            </div>
            <div className="col mx-1">
              <div className="row">
                <OptimalChart />
              </div>
              <div className="row">
                <OptimalResult />
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </div>
  );
}

export default HighlightsOptimalStaking;
