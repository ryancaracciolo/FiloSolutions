import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../Assets/Images/FiloLogo.png';

const Header = ({ onMenuClick }) => {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Filo Logo" />
                    </Link>
                </div>
                <nav className="nav">
                    <ul>
                        <li><Link to="*" className="home">Home</Link></li>
                        <li><Link to="/about" className="about">About Us</Link></li>
                        <li><Link to="/learn-more" className="learn-more">How it Works</Link></li>
                        <li><Link to="/contact" className="contact">Contact</Link></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    <a href="#sign-in" className="sign-in">Sign In</a>
                    <a href="#register" className="register">Register</a>
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