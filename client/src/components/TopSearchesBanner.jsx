import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopSearchesBanner = () => {
  const [topSearches, setTopSearches] = useState([]);

  useEffect(() => {
    const fetchTopSearches = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/top-searches');
        setTopSearches(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopSearches();
  }, []);

  return (
    <div className="top-searches-banner">
      <h3>Top Searches:</h3>
      <ul className="top-searches-list">
        {topSearches.map((search, index) => (
          <li key={index}>{search.term} ({search.count})</li>
        ))}
      </ul>
    </div>
  );
};

export default TopSearchesBanner;