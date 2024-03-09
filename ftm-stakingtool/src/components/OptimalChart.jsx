import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

export default function OptimalChart(props) {
  let restakeDay = [];
  let afterRestake = [];

  props.bestRestakeDay.forEach((day) => {
    restakeDay.push(day);
  });

  for (let i = 0; i < props.restakeDetail.length; i++) {
    afterRestake.push(props.restakeDetail[i][2]);
  }

  return (
    <Box>
      <LineChart
        xAxis={[{ data: afterRestake }]}
        series={[
          {
            data: restakeDay,
            showMark: false,
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
