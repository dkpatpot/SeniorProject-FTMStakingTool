import React from "react";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function OptimalStaking() {
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