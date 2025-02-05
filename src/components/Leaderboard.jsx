import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Leaderboard.css'; // Import the CSS file

function Leaderboard() {
  const [influencers, setInfluencers] = useState([]);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');

  const fetchInfluencers = useCallback((data = {}) => {
    axios.post('https://healthexpert1.onrender.com/api/influencers', data)
      .then(response => {
        setInfluencers(response.data);
        console.log(response.data); // Log the response data
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  
  useEffect(() => {
    // Fetch all records on initial load
    fetchInfluencers();
  }, [fetchInfluencers]);

  const handleSearch = () => {
    const params = {};
    if (name) params.name = name;
    if (domain) params.domain = domain;
  
    fetchInfluencers(params);
  };

  return (
    <div className="leaderboard">
      <h1>Influencer Trust Leaderboard</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Profile Description</th>
            <th>Follower Count</th>
            <th>Revenue</th>
            <th>Domains</th>
          </tr>
        </thead>
        <tbody>
          {influencers.map((influencer) => (
            <tr key={influencer.id}>
              <td>
                <Link to={`/influencer/${influencer.id}`}>{influencer.name}</Link>
              </td>
              <td>{influencer.username}</td>
              <td>{influencer.profile_description}</td>
              <td>{influencer.follower_count}</td>
              <td>{influencer.revenue}</td>
              <td>{influencer.domains.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;