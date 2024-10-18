import React from 'react';
import { Link } from 'react-router-dom';
import './Header-Landing.css';
import logo from '../../../Assets/Images/FiloLogo.png';

const Header = ({ onMenuClick }) => {
    return (
        <header className='header-landing'>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Filo Logo" />
                    </Link>
                </div>
                <nav className="nav">
                    <ul>
                    <li><a href="#home">Chambers of Commerce</a></li>
                    <li><Link to="/app/login" className="about">Chamber Members</Link></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    <Link to="/app/login" className="sign-in">Filo Login</Link>
                    <Link to="/demo" className="demo-request">Request Demo</Link>
                    <div className="hamburger" onClick={onMenuClick}>
                        <span className="menu-line one"></span>
                        <span className="menu-line two"></span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;