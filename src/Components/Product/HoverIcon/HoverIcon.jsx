// HoverIcon.js
import React, { useState } from 'react';
import './HoverIcon.css'

const HoverIcon = ({ IconComponent, label }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [iscopied, setIsCopied] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(label);
    setIsCopied(true);
    setTimeout(() => {
        setIsCopied(false);
        setShowTooltip(false);
      }, 1000); // Adjust the delay (in milliseconds) as needed
  };

  return (
    <div className="icon-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleCopy}>
      {showTooltip && (
        <div className="tooltip">
          <div className="tooltip-text">{iscopied ? 'Copied!' : 'Copy'}</div>
          <div className="tooltip-label">{label}</div>
        </div>
      )}
      <IconComponent className="icon" />
    </div>
  );
};

export default HoverIcon;
