import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import TopSearchesBanner from './components/TopSearchesBanner';
import ImageSearch from './components/ImageSearch';
import SearchHistory from './components/SearchHistory';

const Home = ({ user }) => {
  const logout = () => {
    window.open(
      'http://localhost:5000/auth/logout',
      '_self'
    );
  };

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      <button onClick={logout}>Logout</button>
      <TopSearchesBanner />
      <ImageSearch />
      <SearchHistory />
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/user');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
