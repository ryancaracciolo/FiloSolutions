import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Assuming you have a CSS file for styling
import logo from '../../../Assets/Images/FiloLogo.png';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">
              <img src={logo} alt="Filo Logo" />
             </Link>
          </div>
          <nav className="footer-nav">
            <ul>
              <li><Link to="/" className="nav-item">Home</Link></li>
              <li><Link to="/about" className="nav-item">About Us</Link></li>
              <li><Link to="/learn-more" className="nav-item">How it Works</Link></li>
              <li><Link to="/contact" className="nav-item">Contact</Link></li>
              <li><Link to="/privacy" className="privacy">Privacy Policy</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
