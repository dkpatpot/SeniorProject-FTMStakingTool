import {
  Box,
  Container,
  Grid,
  Input,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OptimalTable from "./OptimalTable";
import OptimalChart from "./OptimalChart";
import OptimalResult from "./OptimalResult";
import SearchIcon from "@mui/icons-material/Search";
import CalculateIcon from "@mui/icons-material/Calculate";

function ftmToUSD(number) {
  return Math.ceil((number / 0.66) * 10000) / 10000;
}

function toFourPoint(number) {
  return Math.ceil(number * 10000) / 10000;
}

function dailyRestake(initialStakeInput, stakingPeriodInput) {
  let initialStake = initialStakeInput * 0.66;
  let stakingPeriod = stakingPeriodInput;
  let rewardPercentage = 0.0612 / stakingPeriod;
  let gasPrice = 0.0012;

  let allStake = initialStake;
  let currentReward = 0;

  let restakeDay = [];
  let restakeDetail = [];

  for (let i = 1; i <= stakingPeriod; i++) {
    currentReward += allStake * rewardPercentage;
    if (currentReward > gasPrice) {
      restakeDetail.push([
        ftmToUSD(allStake),
        ftmToUSD(currentReward),
        ftmToUSD(allStake + currentReward - gasPrice),
      ]);
      allStake += currentReward - gasPrice;
      currentReward = 0;
      restakeDay.push(i);
    }
    if (i === 365 && currentReward != 0) {
      allStake += currentReward;
      currentReward = 0;
    }
  }
  let allStakeFormat = Math.ceil((allStake / 0.66) * 10000) / 10000;
  return [allStakeFormat, restakeDay, restakeDetail];
}

function compareDaily(initialStakeInput, stakingPeriodInput) {
  let initialStake = initialStakeInput * 0.66;
  let stakingPeriod = stakingPeriodInput;
  let rewardPercentage = 0.0612 / stakingPeriod;
  let gasPrice = 0.0012;

  let allStake = initialStake;
  let currentReward = 0;

  let tempAllStake = initialStake;
  let tempCurrentReward = 0;

  let restakeDay = [];
  let restakeDetail = [];

  for (let i = 1; i <= stakingPeriod; i++) {
    currentReward += allStake * rewardPercentage;
    tempCurrentReward += tempAllStake * rewardPercentage;

    if (currentReward > gasPrice) {
      allStake += currentReward - gasPrice;
      currentReward = 0;

      if (tempAllStake + tempCurrentReward - gasPrice < allStake) {
        allStake = tempAllStake + tempCurrentReward - gasPrice;
        restakeDetail.push([
          ftmToUSD(tempAllStake),
          ftmToUSD(tempCurrentReward - gasPrice),
          ftmToUSD(allStake),
        ]);
        tempAllStake = allStake;
        tempCurrentReward = 0;
        restakeDay.push(i);
      }
    }
    if (i === 365 && tempCurrentReward != 0) {
      allStake = tempAllStake + tempCurrentReward;
      tempAllStake = allStake;
      tempCurrentReward = 0;
    }
  }
  let allStakeFormat = Math.ceil((allStake / 0.66) * 10000) / 10000;
  return [allStakeFormat, restakeDay, restakeDetail];
  // return [allStake / 0.66, restakeDay];
}

function HighlightsOptimalStaking() {
  let [initialAmount, setInitialAmount] = useState(1000);
  let [stakingPeriod, setStakingPeriod] = useState(7);

  let [mostReward, setMostReward] = useState(0);
  let [bestRestakeDay, setBestRestakeDay] = useState([]);
  let [restakeDetail, setRestakeDetail] = useState([]);

  function changeInitialAmount(event) {
    const newInitailValue = event.target.value;
    if (newInitailValue > 10000000) {
      setInitialAmount(10000000);
    } else if (newInitailValue < 1) {
      setInitialAmount(1);
    } else {
      setInitialAmount(newInitailValue);
    }
  }

  const handleSliderChange = (event, newValue) => {
    setStakingPeriod(event.target.value);
  };

  const handleInputChange = (event) => {
    setStakingPeriod(Number(event.target.value));
  };

  const handleBlur = () => {
    if (stakingPeriod < 7) {
      setStakingPeriod(7);
    } else if (stakingPeriod > 365) {
      setStakingPeriod(365);
    }
  };

  const compareMostReward = () => {
    console.log(initialAmount);
    console.log(stakingPeriod);
    let [allStakeFormatDaily, restakeDayDaily, restakeDetailDaily] =
      dailyRestake(initialAmount, stakingPeriod);
    let [
      allStakeFormatCompareDaily,
      restakeDayCompareDaily,
      restakeDetailCompareDaily,
    ] = compareDaily(initialAmount, stakingPeriod);

    if (allStakeFormatDaily > allStakeFormatCompareDaily) {
      setMostReward(allStakeFormatDaily);
      setBestRestakeDay(restakeDayDaily);
      setRestakeDetail(restakeDetailDaily);
    } else {
      setMostReward(allStakeFormatCompareDaily);
      setBestRestakeDay(restakeDayCompareDaily);
      setRestakeDetail(restakeDetailCompareDaily);
    }
    console.log("most reward : ", mostReward);
    console.log("best restake : ", bestRestakeDay);
    console.log("restakeDetail : ", restakeDetail);
  };

  useEffect(() => {
    compareMostReward();
  }, []);

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
                value={initialAmount}
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
                      value={
                        typeof stakingPeriod === "number" ? stakingPeriod : 7
                      }
                      onChange={(event) => {
                        handleSliderChange(event);
                      }}
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
                      value={stakingPeriod}
                      size="small"
                      onChange={(event) => {
                        handleInputChange(event);
                      }}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: 7,
                        max: 365,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                      sx={{
                        width: 50,
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
            <div className="col mx-1 pt-3">
              <button
                className="btn btn-warning"
                type="button"
                onClick={compareMostReward}
              >
                <CalculateIcon />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Box sx={{ width: "100%" }}>
                <OptimalTable
                  mostReward={mostReward}
                  bestRestakeDay={bestRestakeDay}
                  restakeDetail={restakeDetail}
                />
              </Box>
            </div>
            <div className="col mx-1">
              <div className="row">
                <OptimalChart
                  bestRestakeDay={bestRestakeDay}
                  restakeDetail={restakeDetail}
                />
              </div>
              <div className="row">
                <OptimalResult
                  mostReward={mostReward}
                  initialAmount={initialAmount}
                />
              </div>
            </div>
          </div>
        </Container>
      </Box>
    </div>
  );
}

export default HighlightsOptimalStaking;
