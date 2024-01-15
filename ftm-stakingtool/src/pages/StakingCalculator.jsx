import React from "react";
import {
    BrowserRouter,
    Route,
    Link
} from "react-router-dom";
import Header from "../components/Header";
// import Box from '@mui/material/Box';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function StakingCalulator() {
    return (
        <div>
            <Header/>
            <Box sx = {{
                width: 300,
                height: 500,
                borderRadius: 5,
                mx: 'auto',
                my: 10,
                bgcolor: '#f0ad4e',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div>
                    <TextField sx = {{
                        my: 4,
                    }}
                        required
                        id="address"
                        label="Wallet Address"
                        type="search"
                    />
                </div>
                <div>
                    <DateTimePicker
                        label="With Time Clock"
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                    />
                </div>
            </Box>
        </div>
    );
};

export default StakingCalulator;