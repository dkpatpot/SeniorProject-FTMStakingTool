import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
export default function CardDetail(props) {
  return (
    <Card variant="outlined" sx={{ minWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            {props.title}
          </Typography>
          <Typography color="text.secondary" gutterBottom variant="h7" component="div">
            {props.price} $
          </Typography>
        </Stack>

      </Box>
    </Card>
  );
}