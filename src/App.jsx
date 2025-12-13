import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PolicyDashboard from './policymaker/PolicyDashboard';
import CommunityDashboard from './community/CommunityDashboard';
import NGODashboard from './ngos/NGODashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/policymaker" element={<PolicyDashboard />} />
        <Route path="/community" element={<CommunityDashboard />} />
        <Route path="/ngos" element={<NGODashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
