import React from "react";
import Divider from '@mui/material/Divider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import TaxCalculatorHero from "../components/TaxCalculatorHero";
import HighlightsTaxCalculator from "../components/HighlightsTaxCalculator";

function StakingCalulator() {

    return (
        <div>
            <Header />
            <TaxCalculatorHero />
            <Box sx={{ bgcolor: 'background.default' }}>
                <Divider />
                <HighlightsTaxCalculator />
                <Divider />
                <Footer />
            </Box>
      </div>
    );
};

export default StakingCalulator;
