import React from "react";
import Divider from '@mui/material/Divider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import HighlightsTaxCalculator from "../components/HighlightsTaxCalculator";

function About() {

    return (
        <div className="montserrat">
            <Header />

            <Box sx={{ bgcolor: 'background.default' }}>
                <Divider />
                <HighlightsTaxCalculator />
                <Divider />
                <Footer />
            </Box>
      </div>
    );
};

export default About;
