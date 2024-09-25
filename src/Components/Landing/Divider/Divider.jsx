import React from 'react';
import './Divider.css'

const Divider = () => {

  return (
    <div className="divider-wrapper">
      <div className="divider-line"></div>
      <div className="divider-diamonds">
        <div className="diamond"></div>
        <div className="diamond"></div>
        <div className="diamond"></div>
        <div className="diamond"></div>
      </div>
      <div className="divider-line"></div>
  </div>
  );
};

export default Divider;
