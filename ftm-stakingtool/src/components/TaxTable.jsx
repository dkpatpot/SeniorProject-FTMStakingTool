import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
export default function TaxTable(props) {
  let TAX_CAPITALGAIN_RATE = props.capitalgainTax;
  let TAX_INCOMETAX_RATE = props.incomeTax;

  function createRow(desc, ftm, price) {
    return { desc, ftm, price };
  }

  function capitalsubtotal(stakeprice, withdrawprice) {
    if (withdrawprice - stakeprice > 0) {
      return withdrawprice - stakeprice;
    } else {
      return 0;
    }
  }

  const rows = [
    createRow("Total FTM stake", props.totalFtmStake, props.totalFtmStakePrice),
    createRow(
      "Withdraw",
      props.totalTokenWithdraw,
      props.totalTokenWithdrawPrice
    ),
    createRow(
      "Claim rewards",
      props.totalClaimReward,
      props.totalClaimRewardPrice
    ),
    createRow("Restake", props.totalRestake, props.totalRestakePrice),
  ];

  const incomeSubtotal = capitalsubtotal(
    props.totalFtmStakePrice,
    props.totalTokenWithdrawPrice
  );
  const incomeTaxes = (TAX_INCOMETAX_RATE/100) * incomeSubtotal;
  const capitalSubtotal = props.totalRestakePrice+props.totalClaimRewardPrice;
  const capitalTaxes = (TAX_CAPITALGAIN_RATE/100) * capitalSubtotal;
  const totalTaxes = capitalTaxes + incomeTaxes;
  return (
    <div>
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
      <div className="my-5">
      <Typography component="h4" variant="h4">
          Your summarize
        </Typography>
      </div>
      </Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Desc</TableCell>
              <TableCell align="right" colSpan={2}>
                FTM
              </TableCell>
              <TableCell align="right" colSpan={1}>
                USD ($)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right" colSpan={2}>
                  {row.ftm}
                </TableCell>
                <TableCell align="right" colSpan={1}>
                  {row.price}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={5} />
              <TableCell colSpan={2}>Capital gain subtotal</TableCell>
              <TableCell align="right">{capitalSubtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Capital gain Tax</TableCell>
              <TableCell align="right">{TAX_CAPITALGAIN_RATE} %</TableCell>
              <TableCell align="right">{capitalTaxes}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Income tax subtotal</TableCell>
              <TableCell align="right">{incomeSubtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Income Tax</TableCell>
              <TableCell align="right">{TAX_INCOMETAX_RATE} %</TableCell>
              <TableCell align="right">{incomeTaxes}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>Total Taxes</TableCell>
              <TableCell align="right">{totalTaxes}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
