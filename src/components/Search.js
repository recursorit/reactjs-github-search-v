import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column'
    },
  },
}));

const Search = ({onSearch, loading, error, search, setSearch}) => {
  const classes = useStyles();

  return (
    <Fade in={true} timeout={1000}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          error={false}
          id="search-field"
          label="Search"
          variant="outlined"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="btn-wrapper">
          <Button
            variant="contained"
            color="primary"
            disabled={search.length === 0 || loading}
            onClick={() => onSearch()}>
            Submit
          </Button>
          { loading && <CircularProgress size={24} className="btn-progress" /> }
        </div>
      </form>
    </Fade>
  )
}

export default Search
