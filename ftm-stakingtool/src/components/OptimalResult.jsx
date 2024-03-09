import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(category, normalStaking, optimalStaking) {
  return { category, normalStaking, optimalStaking };
}

function toFourPoint(number) {
  return Math.ceil(number * 10000) / 10000;
}

export default function OptimalResult(props) {
  function getInitialAmount() {
    if (props.initialAmount === 0) {
      return 0;
    } else {
      return props.initialAmount;
    }
  }

  function getReturn() {
    let returnNormal = toFourPoint(getInitialAmount() * 1.0612);
    let returnOptimal = 0;
    if (props.mostReward === 0) {
      returnNormal = 0;
      returnOptimal = 0;
    } else {
      returnOptimal = props.mostReward;
    }
    return [returnNormal, returnOptimal];
  }

  function getYeild() {
    let returnOptimalForYeild = getReturn()[1];

    let yeildNormal = "6.12%";
    let yeildOptimal = 0;
    if (props.mostReward === 0) {
      yeildNormal = 0;
      yeildOptimal = 0;
    } else {
      yeildOptimal = toFourPoint(
        (props.mostReward * 100) / getInitialAmount() - 100
      );
    }
    return [yeildNormal, yeildOptimal + "%"];
  }

  let [returnNormalShow, returnOptimalShow] = getReturn();
  let [yeildNormalShow, yeildOptimalShow] = getYeild();
  let rows = [
    createData("Initial Amount", getInitialAmount(), getInitialAmount()),
    createData("Returns Amount", returnNormalShow, returnOptimalShow),
    createData("Yield", yeildNormalShow, yeildOptimalShow),
  ];
  return (
    <TableContainer component={Paper} sx={{ width: 500, ml: 1.5, mt: 2 }}>
      <Table sx={{ minWidth: 470 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ height: 60, fontWeight: "bold" }}>
              Compare
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Normal Staking
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Optimal Staking
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.category}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ height: 50 }}>
                {row.category}
              </TableCell>
              <TableCell align="right">{row.normalStaking}</TableCell>
              <TableCell align="right">{row.optimalStaking}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
