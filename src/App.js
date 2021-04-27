import Search from "./components/Search";
import axios from 'axios';
import { useState } from "react";
import Results from "./components/Results";
import Alerts from './components/Alerts';
import Box from '@material-ui/core/Box';

const BASE_URL = 'https://api.github.com';
const PER_PAGE = 9;
function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [order, setOrder] = useState('login');
  const [orderBy, setOrderBy] = useState('asc');
  const [page, setPage] = useState(1);

  const generateURL = (searchTerm, currentPage, sort, order) => {
    return `?q=${encodeURIComponent(`${searchTerm} in:login`)}&per_page=${PER_PAGE}&page=${currentPage}&sort=${sort}&order=${order}`
  }

  const onSearch = async () => {
    setLoading(true);
    setOrder('login');
    setOrderBy('asc');
    await fetchData(search, page, 'login', 'asc');

    setLoading(false);
  }

  const fetchData = async (searchTerm, currentPage, sort, order) => {
    let errTmp;
    const response = await axios.get(`${BASE_URL}/search/users${generateURL(searchTerm, currentPage, sort, order)}`).catch((err) => {
      errTmp = err.response.data.message;
      setError(err.response.data.message);
    });
    if (!errTmp) {
      if (response.data.items.length > 1) {
        setRows(response.data.items);
        setTotalCount(response.data.total_count);
      } else {
        setError('The search returned 0 results. Please try another name.');
      }
    }
  }

  const onResetRows = () => {
    setRows([]);
  }

  const closeAlert = () => {
    setError('');
  }

  const handlePageChange = async (event, page) => {
    setPage(page);
    await fetchData(search, page, order, orderBy);
  }

  const handleSort = async (event, property) => {
    setOrder(property);
    const propertyTmp = property !== order;
    const orderByTmp = (propertyTmp ? 'asc' : (orderBy === 'asc' ? 'desc' : 'asc'));
    const currentPage = 1;
    setOrderBy(orderByTmp);
    setPage(currentPage);

    await fetchData(search, currentPage, property, orderByTmp);
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <h2>ReactJS Test Assignment - Scalio</h2>
      { error && <Alerts className="alert-box" severity="error" errorMessage={error} onClose={closeAlert} /> }
      { rows.length < 1
        ? <Search
            onSearch={onSearch}
            setSearch={setSearch}
            search={search}
            loading={loading}
            error={error}
          />
        : <Results
            rows={rows}
            resetRows={onResetRows}
            totalCount={totalCount}
            order={order}
            orderBy={orderBy}
            handlePageChange={handlePageChange}
            perPage={PER_PAGE}
            handleSort={handleSort}
            currentPage={page}
          />
      }
    </Box>
  );
}

export default App;
