import React from 'react';
import { Link } from 'react-router-dom';
import './Footer-Landing.css'; // Assuming you have a CSS file for styling
import logo from '../../../Assets/Images/Filo-Logo-white.png';

function Footer() {
  return (
    <footer className='footer-landing'>
      <div className="container">
        <hr/>
        <div className="footer-content">
          <div className="footer-logo">
              <img src={logo} alt="Filo Logo" />
          </div>
          <p className='copyright'>Copyright © 2024 Filo Solutions, Inc</p>
          <nav className="footer-nav">
            <ul>
              <li><a href="#home">Chamber of Commerce</a></li>
              <li><Link to="/app/login" className="about">Chamber Members</Link></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
