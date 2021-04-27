import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import EnhancedTableHead from './EnhancedTableHead';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const Results = ({rows, resetRows, handlePageChange, order, orderBy, totalCount, perPage, handleSort, currentPage}) => {
  const classes = useStyles();

  const handleRequestSort = (event, property) => {
    handleSort(event, property);
  }

  return (
    <Fade in={true}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Button
            onClick={() => resetRows()}
            variant="contained"
            color="primary"
            pb={1}
          >
            Go Back
          </Button>
          <TableContainer className="table-container">
            <Table className="table" aria-label="data table" stickyHeader>
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell><Avatar alt={row.node_id} src={row.avatar_url} /></TableCell>
                    <TableCell>{row.login}</TableCell>
                    <TableCell>{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Pagination page={currentPage} count={Math.ceil(totalCount/perPage)} onChange={(event, page) => handlePageChange(event, page)} />
      </Box>
    </Fade>
  );
}

export default Results;
