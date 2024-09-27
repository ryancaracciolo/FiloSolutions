import React from 'react';
import ReactDOM from 'react-dom';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
    if (!isLoading) { return null;}

    // Render the popup in the body using React Portal
    return (
        <div className="loading-overlay">
            <div className="circle-container">
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
            <div className="loading-circle"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
