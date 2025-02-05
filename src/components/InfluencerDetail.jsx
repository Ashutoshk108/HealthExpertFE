import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './InfluencerDetail.css'; // Import the CSS file

function InfluencerDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://healthexpert1.onrender.com/api/influencers/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const { influencer, claims } = data;

  return (
    <div className="influencer-detail">
      <div className="influencer-header">
        <img src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg" alt="Profile" className="profile-image" />
        <div className="influencer-info">
          <h1>{influencer?.name || 'N/A'}</h1>
          <p className="description">{influencer?.profile_description || 'No description available'}</p>
          <div className="info">
            <p><strong>Revenue Source:</strong> {influencer?.revenue_source || 'N/A'}</p>
            <p><strong>Followers:</strong> {influencer?.follower_count || 'N/A'}</p>
            <p><strong>Revenue:</strong> {influencer?.revenue || 'N/A'}</p>
            <p><strong>Domains:</strong> {influencer?.domains?.join(', ') || 'N/A'}</p>
            <p><strong>Trust Socore:</strong> {influencer?.trust_score || 'N/A'}</p>
          </div>
        </div>
      </div>

      <h2>Claims</h2>
      <table className="claims-table">
        <thead>
          <tr>
            <th>Claim</th>
            <th>Category</th>
            <th>Status</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {claims?.map(claim => (
            <tr key={claim.id}>
              <td>{claim.text || 'N/A'}</td>
              <td>{claim.category || 'N/A'}</td>
              <td>{claim.verification_status || 'N/A'}</td>
              <td>
                {claim.source ? (
                  <a href={claim.source} target="_blank" rel="noopener noreferrer">View Source</a>
                ) : 'N/A'}
              </td>
            </tr>
          )) || <tr><td colSpan="4">No claims available</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default InfluencerDetail;