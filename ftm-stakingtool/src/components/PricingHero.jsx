import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function PricingHero(props) {
  const [ftmprice, setFtmprice] = useState();
  const currentdate = new Date();
  function formatValue(value) {
    return Math.round(value * 100000) / 100000;
  }
  async function fetchPrice() {
    try {
      const response = await axios.get("http://localhost:4000/getcurrentprice");
      setFtmprice(formatValue(response.data.market_data.current_price.usd));
      props.callBackMarketData(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchPrice();
  }, []);
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : "linear-gradient(#02294F, #090E10)",
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            component="h3"
            variant="h3"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Currently FTM Price&nbsp;
            <Typography
              component="span"
              variant="h3"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              {ftmprice} $
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            on {currentdate.toLocaleString()}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
