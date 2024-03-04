import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';
import TransactionTable from './TransactionTable';

export default function Highlights() {
    const [transactionList, setTransactionList] = useState([]);
    let [isTransactionlist, setIsTransactionList] = useState(false);
    function transactionListCallBack(data) {
      setTransactionList(data);
      setIsTransactionList(true);
    }
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
          <Typography component="h2" variant="h4">
            Fantom Explorer
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Search transaction from your addresses.
          </Typography>
        </Box>
        <div className="col-lg-12 mx-auto">
            <SearchBar callBackTransaction={transactionListCallBack} />
        </div>
        <div className="col-lg-12 mx-auto">
        {isTransactionlist ? <div><TransactionTable transactionList={transactionList} /></div>:<div></div>}
      </div>
      </Container>
    </Box>
  );
}