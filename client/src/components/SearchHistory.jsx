import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/history');
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSearchHistory();
  }, []);

  return (
    <div className="search-history">
      <h3>Your Search History:</h3>
      <ul className="search-history-list">
        {history.map((item, index) => (
          <li key={index}>{item.term} (Searched on: {new Date(item.timestamp).toLocaleString()})</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;