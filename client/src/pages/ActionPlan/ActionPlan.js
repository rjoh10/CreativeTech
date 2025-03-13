import React from 'react';
import { Link } from 'react-router-dom';

function ActionPlan() {
  return (
    <div>
      <h1>Boston's Rodent Action Plan</h1>
      
      <Link to="/rat-mitigation">
        <button>
          Learn More About Rat Mitigation
        </button>
      </Link>
    </div>
  );
}

export default ActionPlan;
