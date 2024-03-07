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

const rows = [
  createData("Initial Amount", 159, 6.0),
  createData("Returns Amount", 237, 9.0),
  createData("Yield", 262, 16.0),
];

export default function OptimalResult() {
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
