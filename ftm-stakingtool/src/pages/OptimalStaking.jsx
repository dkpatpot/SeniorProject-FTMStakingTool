import React from "react";
import Header from "../components/Header";
import OptimalStakingHero from "../components/OptimalStakingHero";
import { Box, Divider } from "@mui/material";
import Footer from "../components/Footer";
import HighlightsOptimalStaking from "../components/HighlightsOptimalStaking";

function OptimalStaking() {
    return (
        <div>
            <Header />
            <OptimalStakingHero />
            <Box sx={{ bgcolor: 'background.default' }}>
                <Divider />
                <HighlightsOptimalStaking />
                <Divider />
                <Footer />
            </Box>
        </div>
    );
}

export default OptimalStaking;