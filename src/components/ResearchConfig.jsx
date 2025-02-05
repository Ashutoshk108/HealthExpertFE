import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResearchConfig.css'; // Import the CSS file

function ResearchConfig() {
  const [claims, setClaims] = useState([]);
  const [influencerName, setInfluencerName] = useState('');
  const [domain, setDomain] = useState('');

  useEffect(() => {
    // Fetch all claims by default using the GET route
    fetchClaimsByType('all');
  }, []);

  const fetchClaimsByType = (type) => {
    axios.get(`http://localhost:8000/api/discovery/claims/${type}`)
      .then(response => {
        setClaims(response.data);
      })
      .catch(error => console.error("Error fetching claims by type:", error));
  };

  const fetchClaims = (params = {}) => {
    axios.post('http://localhost:8000/api/discovery/claims', params)
      .then(response => {
        setClaims(response.data);
      })
      .catch(error => console.error("Error fetching claims:", error));
  };

  const handleSearch = () => {
    const params = {
      influencer_name: influencerName || undefined,
      domain: domain || undefined,
    };
    fetchClaims(params);
  };

  return (
    <div className="research-config">
      <h1>Research Configuration</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Influencer Name"
          value={influencerName}
          onChange={(e) => setInfluencerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <select onChange={(e) => fetchClaimsByType(e.target.value)}>
          <option value="all">All</option>
          <option value="verified">Verified</option>
          <option value="questionable">Questionable</option>
          <option value="debunked">Debunked</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <table className="claims-table">
        <thead>
          <tr>
            <th>Claim</th>
            <th>Category</th>
            <th>Influencer</th>
            <th>Claim Status</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.claim}</td>
              <td>{claim.domain}</td>
              <td>{claim.influencer_name}</td>
              <td>{claim.status}</td>
              <td>
                {claim.source ? (
                  <a href={claim.source} target="_blank" rel="noopener noreferrer">View Source</a>
                ) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResearchConfig;