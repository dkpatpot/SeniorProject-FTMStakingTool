import React from "react";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


function OptimalStaking() {
    const coinOptions = ['ETH', 'FTM', 'BNB'];

    const [coinValue, setCoinValue] = React.useState(coinOptions[0]);
    const [inputCoinValue, setInputCoinValue] = React.useState('');

    const providerOptions = ['Provider 1', 'Provider 2', 'Provider 3'];

    const [providerValue, setProviderValue] = React.useState(providerOptions[0]);
    const [inputProviderValue, setInputProviderValue] = React.useState('');

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
                                <Autocomplete
                                    coinValue={coinValue}
                                    onChange={(event, newCoinValue) => {
                                    setCoinValue(newCoinValue);
                                    }}
                                    inputCoinValue={inputCoinValue}
                                    onInputChange={(event, newInputCoinValue) => {
                                    setInputCoinValue(newInputCoinValue);
                                    }}
                                    id="coin-state"
                                    options={coinOptions}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField {...params} label="Coin" />}
                                />
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
                                <Autocomplete
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
                                />
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
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
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
                </Box>
            </Box>
            
        </div>
    );
};

export default OptimalStaking;
// 