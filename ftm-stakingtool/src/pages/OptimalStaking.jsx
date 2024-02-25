import React, { useState } from "react";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(number, day, BRReward, restakeAmount, ARReward) {
    return {
        number,
        day,
        restake: [
            {
                BRReward: BRReward,
                restakeAmount: restakeAmount,
                ARReward: ARReward
            }
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.number}
          </TableCell>
          <TableCell align="right">{row.day}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Restake
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>BRReward</TableCell>
                      <TableCell>restakeAmount</TableCell>
                      <TableCell align="right">ARReward</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.restake.map((restakeRow) => (
                      <TableRow key={restakeRow.BRReward}>
                        <TableCell component="th" scope="row">
                          {restakeRow.BRReward}
                        </TableCell>
                        <TableCell>{restakeRow.restakeAmount}</TableCell>
                        <TableCell align="right">{restakeRow.ARReward}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
      number: PropTypes.number.isRequired,
      day: PropTypes.number.isRequired,
      restake: PropTypes.arrayOf(
        PropTypes.shape({
            BRReward: PropTypes.number.isRequired,
            restakeAmount: PropTypes.number.isRequired,
            ARReward: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }).isRequired,
};

function OptimalStaking() {
    const coinOptions = ['ETH', 'FTM', 'BNB'];

    const providerOptions = ['Provider 1', 'Provider 2', 'Provider 3'];

    let [rows, setRows] = useState([]);

    const testRows = [createData(1, 1, 10, 100, 1000)];
    // const [providerValue, setProviderValue] = React.useState(providerOptions[0]);
    // const [inputProviderValue, setInputProviderValue] = React.useState('');
    const [initialAmount, setInitialAmount] = useState(0);
    const [stakingPeriod, setStakingPeriod] = useState(0);

    let rewardInterval = 7;
    let rewardPercentage = 6.1;
    let allStakingReward;
    let gasPrice = 500;
    let restakeDays = [];

    let currentStakingReward = 0;

    function changeInitialAmount(event) {
        setInitialAmount(event.target.value);
        console.log("initialAmount = " + event.target.value);
    }

    function changeStakingPeriod(event) {
        setStakingPeriod(event.target.value);
        console.log("stakingPeriod = 1" + event.target.value);
    }

    function calculateOptimalStaking() {
        console.log({
            initialAmount: initialAmount,
            stakingPeriod: stakingPeriod,
            rewardInterval: rewardInterval,
            rewardPercentage: rewardPercentage,
            allStakingReward: allStakingReward,
            gasPrice: gasPrice,
            restakeDays: restakeDays,
            currentStakingReward: currentStakingReward,
        })
        allStakingReward = 1000; //bug
        restakeDays = [];
        currentStakingReward = 0;

        let tempNum = 1;
        for (let day = 1; day <= stakingPeriod; day++) {

            if (day % rewardInterval === 0) {
                let BRRewardTemp = 0;
                let restakeAmountTemp = 0;

                currentStakingReward += (allStakingReward * rewardPercentage) / 100;
                console.log("Day " + day + " currentStakingReward = " + currentStakingReward);
                console.log("Day " + day + " allStakingReward = " + allStakingReward);

                if (currentStakingReward > gasPrice) {
                    console.log("Day " + day + " Before plus currentStakingReward = " + currentStakingReward);
                    console.log("Day " + day + " Before plus allStakingReward = " + allStakingReward);
                    console.log("Day " + day + " Before plus gasPrice = " + gasPrice);
                    BRRewardTemp = allStakingReward;
                    restakeAmountTemp = currentStakingReward - gasPrice;
                    allStakingReward =  allStakingReward + (currentStakingReward - gasPrice);
                    console.log("Day " + day + " After plus allStakingReward = " + allStakingReward);
                    restakeDays.push(day);
                    currentStakingReward = 0;

                    setRows()
                    rows.push(createData(tempNum, day, BRRewardTemp, restakeAmountTemp, allStakingReward));
                    tempNum++;
                }
            }
        }

        return allStakingReward, restakeDays, rows;
    }

    function checkLog() {
        console.log(allStakingReward);
        console.log(restakeDays);
        console.log(rows);
    }

    function clearData() {
        restakeDays = 0;
        setInitialAmount(0);
        setStakingPeriod(0);
        currentStakingReward = 0;
    }

    return (
        <div>
            <Header/>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                }}
            >
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    p: 1,
                    mx: 1,
                    my: 0,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    }}
                >
                    <Box sx = {{
                        border: 2,
                        borderBottom: 4,
                        borderLeft: 4,
                        p: 1,
                        my: 0,
                        mx: 0,
                        width: 300,
                        height: 230,
                        borderRadius: 5,
                        bgcolor: '#f0ad4e',
                        }}>
                            <div>
                                <h4>Step #1</h4>
                                <h3>Choose Asset</h3>
                                <br />
                                <h2>FTM</h2>
                            </div>
                    </Box>

                    <Box sx = {{
                        border: 2,
                        borderBottom: 4,
                        borderLeft: 4,
                        p: 1,
                        my: 4.8,
                        mx: 0,
                        width: 300,
                        height: 230,
                        borderRadius: 5,
                        bgcolor: '#f0ad4e',
                        }}>
                            <div>
                                <h4>Step #2</h4>
                                <h3>Choose Provider</h3>
                                <br />
                                {/* <Autocomplete
                                    providerValue={providerValue}
                                    onChange={(event, newProviderValue) => {
                                    setProviderValue(newProviderValue);
                                    }}
                                    inputProviderValue={inputProviderValue}
                                    onInputChange={(event, newInputProviderValue) => {
                                    setInputProviderValue(newInputProviderValue);
                                    }}
                                    id="provider-state"
                                    options={providerOptions}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField {...params} label="Provider" />}
                                /> */}
                                <h2>Fantom Validator</h2>
                            </div>
                    </Box>
                </Box>

                <Box sx = {{
                        border: 2,
                        borderBottom: 4,
                        borderLeft: 4,
                        p: 1,
                        my: 1,
                        mx: 2,
                        width: 300,
                        height: 500,
                        borderRadius: 5,
                        bgcolor: '#f0ad4e',
                    }}>
                        <div>
                            <h4>Step #3</h4>
                            <h3>Enter Staking Amount</h3>
                            <br />
                            <FormControl fullWidth sx={{ width: 250 }}>
                                <InputLabel 
                                    htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    endAdornment={<InputAdornment position="end">FTM</InputAdornment>}
                                    label="Amount"
                                    onChange={(event) => {
                                        changeInitialAmount(event);
                                    }}
                                />
                            </FormControl>

                            <h1></h1>
                            <br />
                            <h3>Enter Staking Period</h3>
                            <br />

                            <FormControl fullWidth sx={{ width: 250 }}>
                                <InputLabel 
                                    htmlFor="outlined-adornment-amount">Period</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    endAdornment={<InputAdornment position="end">Days</InputAdornment>}
                                    label="Period"
                                    onChange={(event) => {
                                        changeStakingPeriod(event);
                                    }}
                                />
                            </FormControl>
                        </div>
                </Box>

                <Box sx = {{
                        border: 2,
                        borderBottom: 4,
                        borderLeft: 4,
                        p: 1,
                        my: 1,
                        mx: 2,
                        width: 500,
                        height: 500,
                        borderRadius: 5,
                        bgcolor: '#f0ad4e',
                    }}>

                    <h3>Gas Price Today</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell >No</TableCell>
                                <TableCell align="right">Day</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <Row key={row.number} row={row} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Button onClick={calculateOptimalStaking} variant="contained">Test</Button>
            <Button onClick={checkLog} variant="contained">Log</Button>
            <Button onClick={clearData} variant="contained">Clear</Button>
            
        </div>
    );
};

export default OptimalStaking;