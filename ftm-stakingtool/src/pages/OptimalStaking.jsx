import React from "react";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function OptimalStaking() {
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
                        id="returnsPercent"
                        label="Returns Percent"
                        type="search"
                    />
                </div>
            </Box>
        </div>
    );
};

export default OptimalStaking;
// 