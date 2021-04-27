import Search from "./components/Search";
import axios from 'axios';
import { useState } from "react";
import Results from "./components/Results";
import Alerts from './components/Alerts';
import Typography from '@material-ui/core/Typography';

const BASE_URL = 'https://api.github.com';

function App() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateURL = (searchQuery) => {
    return `?q=${encodeURIComponent(`${searchQuery} in:login`)}&per_page=100`
  }

  const onSearch = async (searchTerm) => {
    setLoading(true);
    const response = await axios.get(`${BASE_URL}/search/users${generateURL(searchTerm)}`);
    if (response.data.items.length > 1) {
      setRows(response.data.items);
    } else {
      setError('The search returned 0 results. Please try another name.');
    }

    setLoading(false);
  }

  const onResetRows = () => {
    setRows([]);
  }

  const closeAlert = () => {
    setError('');
  }

  return (
    <div className="container">
      <Typography variant="h2" gutterBottom>
      ReactJS Test Assignment - Scalio
      </Typography>

      { error && <Alerts className="alert-box" severity="error" errorMessage={error} onClose={closeAlert} /> }
      { rows.length < 1
        ? <Search onSearch={onSearch} loading={loading} error={error}/>
        : <Results rows={rows} resetRows={onResetRows} />
      }
    </div>
  );
}

export default App;
