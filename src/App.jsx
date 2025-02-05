import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import ResearchConfig from './components/ResearchConfig';
import InfluencerDetail from './components/InfluencerDetail';
import Navbar from './components/Navbar'; // Import the Navbar

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar /> {/* Include the Navbar */}
        <Routes>
          <Route path="/" element={<Leaderboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/influencer/:id" element={<InfluencerDetail />} />
          <Route path="/research" element={<ResearchConfig />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;