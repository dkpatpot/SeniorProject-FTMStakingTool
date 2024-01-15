import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const wei = 1000000000000000000;
const columns = [
  { id: 'transactionHash', label: 'Transaction Hash', minWidth: 150 },
  { id: 'method', label: 'Method', minWidth: 70 },
  {
    id: 'from',
    label: 'From',
    minWidth: 200,
    align: 'right',
  },
  {
    id: 'to',
    label: 'To',
    minWidth: 200,
    align: 'right',
  },
  {
    id: 'value',
    label: 'Value',
    minWidth: 130,
    align: 'right',
  },
];

export default function TransactionTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = [];
  props.transactionList.forEach((transaction)=>{
    if (transaction.decoded_call === null){
      rows.push({transactionHash:transaction.hash,method:"transfer",from:transaction.from_address,to: transaction.to_address,value:transaction.value/wei+' FTM'});
    }else{
      rows.push({transactionHash:transaction.hash,method:transaction.decoded_call.label,from:transaction.from_address,to: transaction.to_address,value:transaction.value/wei+' FTM'});
    }
    
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.transactionHash}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}