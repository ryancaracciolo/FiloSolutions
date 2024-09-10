import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../../Assets/Images/FiloLogo.png';
import {ReactComponent as QrButton} from '../../../Assets/Icons/qr-icon.svg';
import {ReactComponent as ProfileButton} from '../../../Assets/Icons/profile-icon.svg';


const Header = () => {
    return (
        <header className='product-header'>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Filo Logo" />
                </div>
                <div className="product-header-buttons">
                    <Link to="/app/qr-code" className="qr-button">
                        <QrButton className='header-button' />
                    </Link>
                    <Link to="/app/profile" className="profile-button">
                        <ProfileButton className='header-button' />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;