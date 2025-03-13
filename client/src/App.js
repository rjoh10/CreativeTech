import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ActionPlan from './pages/ActionPlan/ActionPlan';
import RatMitigation from './pages/RatMitigation/RatMitigation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ActionPlan />} />
        <Route path="/rat-mitigation" element={<RatMitigation />} />
      </Routes>
    </div>
  );
}

export default App;
