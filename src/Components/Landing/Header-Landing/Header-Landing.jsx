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
                        <li><Link to="/" className="home">Home</Link></li>
                        <li><Link to="/about" className="about">About Us</Link></li>
                        <li><Link to="/learn-more" className="learn-more">How it Works</Link></li>
                        <li><Link to="/contact" className="contact">Contact</Link></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    <Link to="/learn-more" className="sign-in">Sign In</Link>
                    <Link to="/learn-more" className="register">Register</Link>
                    <div className="hamburger" onClick={onMenuClick}>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;