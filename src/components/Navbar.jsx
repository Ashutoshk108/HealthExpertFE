import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">InfluencerApp</Link>
        <ul className="navbar-menu">
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/research">Research</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;