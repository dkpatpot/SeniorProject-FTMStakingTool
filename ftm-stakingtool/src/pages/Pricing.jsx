import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import PricingHero from '../components/PricingHero';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HighlightsMarketData from '../components/HighlightsMarketData';
export default function Pricing() {
    let [marketData,setMarketData] = useState();
    function MarketDataCallBack(data) {
        setMarketData(data);
    }
  return (
    <div>
      <Header />
      <PricingHero callBackMarketData={MarketDataCallBack}/>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <HighlightsMarketData marketData={marketData}/>
        <Divider />
        <Footer />
      </Box>
    </div>
  );
}