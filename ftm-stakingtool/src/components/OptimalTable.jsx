import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(restakeNo, day) {
  return {
    restakeNo,
    day,
    restakeDetail: [
      {
        amountBoforeRestake: "2020-01-05",
        reward: "11091700",
        amountAfterRestake: 3,
      },
      {
        amountBoforeRestake: "2020-01-02",
        reward: "Anonymous",
        amountAfterRestake: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.restakeNo}
        </TableCell>
        <TableCell />
        <TableCell align="left">{row.day}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Restake Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Amount Before Restake</TableCell>
                    <TableCell>Reward</TableCell>
                    <TableCell align="right">Amount After Restake</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.restakeDetail.map((restakeDetailRow) => (
                    <TableRow key={restakeDetailRow.amountBoforeRestake}>
                      <TableCell component="th" scope="row">
                        {restakeDetailRow.amountBoforeRestake}
                      </TableCell>
                      <TableCell>{restakeDetailRow.reward}</TableCell>
                      <TableCell align="right">
                        {restakeDetailRow.amountAfterRestake}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    restakeNo: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    restakeDetail: PropTypes.arrayOf(
      PropTypes.shape({
        amountBoforeRestake: PropTypes.string.isRequired,
        reward: PropTypes.string.isRequired,
        amountAfterRestake: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData(1, 159),
  createData(2, 237),
  createData(3, 262),
  createData(4, 305),
  createData(5, 356),
];

export default function OptimalTable() {
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: 50,
              }}
            />
            <TableCell sx={{ width: 150 }}>Restake No.</TableCell>
            <TableCell sx={{ pr: 30 }} />
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
