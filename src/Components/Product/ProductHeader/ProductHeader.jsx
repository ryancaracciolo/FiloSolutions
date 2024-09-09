import React from 'react';
import { Link } from 'react-router-dom';
import './ProductHeader.css';
import logo from '../../../Assets/Images/FiloLogo.png';
import qrButton from '../../../Assets/Icons/settings-icon.svg';
import profileButton from '../../../Assets/Icons/home-icon.svg';


function ProductHeader() {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Filo Logo" />
                </div>
                <div className="product-header-buttons">
                    <Link to="/app/qr-code" className="qr-button">
                        <img src={qrButton} alt="QR Code" />
                    </Link>
                    <Link to="/app/profile" className="profile-button">
                        <img src={profileButton} alt="Profile" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default ProductHeader;