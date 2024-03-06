import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardDetail from './CardDetail';
import CardFTM from './CardFTM';

export default function HighlightsMarketData(props) {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h3">
            FTM Market detail
          </Typography>
          <Typography
              component="span"
              variant="h5"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Market cap rank #{props.marketData?.data?.market_data?.market_cap_rank}
            </Typography>
        </Box>
        <div className='row'>
          <div className='col'>       
            <CardDetail title="Market cap" price={props.marketData?.data?.market_data?.market_cap?.usd} />
          </div>
          <div className='col'>       
            <CardDetail title="High 24hr" price={props.marketData?.data?.market_data?.high_24h?.usd} />
          </div>
          <div className='col'>       
            <CardDetail title="Low 24hr" price={props.marketData?.data?.market_data?.low_24h?.usd} />
          </div>
        </div>
        <div className='row'>
          <div className='col'>       
            <CardDetail title="Total volume" price={props.marketData?.data?.market_data?.total_volume?.usd} />
          </div>
          <div className='col'>       
            <CardDetail title="All time high" price={props.marketData?.data?.market_data?.ath?.usd} />
          </div>
          <div className='col'>       
            <CardDetail title="All time low" price={props.marketData?.data?.market_data?.atl?.usd} />
          </div>
        </div>
        <div className='row'>
          <div className='col'>       
            <CardFTM title="Total supply" price={props.marketData?.data?.market_data?.total_supply} />
          </div>
          <div className='col'>       
            <CardFTM title="Max supply" price={props.marketData?.data?.market_data?.max_supply} />
          </div>
          <div className='col'>       
            <CardFTM title="Circulating supply" price={props.marketData?.data?.market_data?.circulating_supply} />
          </div>
        </div>

      </Container>
    </Box>
  );
}