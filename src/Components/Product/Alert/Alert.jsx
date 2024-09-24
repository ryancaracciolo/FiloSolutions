import React, { useEffect } from 'react';
import './Alert.css'; 

const Alert = ({ title, message, isVisible, onClose }) => {
  // Automatically hide the alert after 1 second
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`alert-container ${isVisible ? 'show' : ''}`}>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
