import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const EnhancedTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: 'avatar_url', numeric: false, disablePadding: true, label: 'Avatar' },
    { id: 'login', numeric: true, disablePadding: false, label: 'Login' },
    { id: 'type', numeric: true, disablePadding: false, label: 'Type' }
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={order === headCell.id ? orderBy: false}
          >
            <TableSortLabel
              active={order === headCell.id}
              direction={order === headCell.id ? orderBy : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {order === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {orderBy === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;