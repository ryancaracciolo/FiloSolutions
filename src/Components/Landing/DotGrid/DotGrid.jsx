import React from 'react';
import './DotGrid.css'

const DotGrid = () => {
  const dots = Array(240).fill(null); // 20x20 = 400 dots

  return (
    <div className="dot-grid">
      {dots.map((_, index) => (
        <div key={index} className="dot"></div>
      ))}
    </div>
  );
};

export default DotGrid;
