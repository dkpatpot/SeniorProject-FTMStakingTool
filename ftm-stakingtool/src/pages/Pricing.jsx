import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PriceChart from '../components/PriceChart';
export default function Pricing() {
  return (
    <div>
      <Header />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <PriceChart />
        <Footer />
      </Box>
    </div>
  );
}