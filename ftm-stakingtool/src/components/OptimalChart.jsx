import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

export default function OptimalChart() {
  return (
    <Box>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
        sx={{
          bgcolor: "#fff",
          borderRadius: 1,
        }}
      />
    </Box>
  );
}
