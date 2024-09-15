import React from 'react';
import ReactDOM from 'react-dom';
import './Popup.css';
import Referral from '../Referral/Referral'

const Popup = ({ show, partnerData, onClose }) => {

  if (!show) return null;

  // Render the popup in the body using React Portal
  return ReactDOM.createPortal(
    <div className="popup-overlay">
        <Referral partnerData={partnerData} closeClicked={onClose}/>
    </div>,
    document.body // Mounting the popup at the root level
  );
};

export default Popup;
