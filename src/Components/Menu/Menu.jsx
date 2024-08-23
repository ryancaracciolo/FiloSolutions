import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu({isOpen, onMenuClosed}) {
  return (
    <nav className={`menu ${isOpen ? 'open' : 'closed'}`}>
        <div className="close-Menu" onClick={onMenuClosed}>
            <span id="x1"></span>
            <span id="x2"></span>    
        </div>
        <ul>
            <li onClick={onMenuClosed}><Link to="/home">Home</Link></li>
            <li onClick={onMenuClosed}><Link to="/about">About</Link></li>
            <li onClick={onMenuClosed}><Link to="/learn-more">Learn More</Link></li>
            <li onClick={onMenuClosed}><Link to="/contact">Contact</Link></li>
            <li onClick={onMenuClosed}><Link to="/privacy-policy">Privacy Policy</Link></li>
        </ul>
  </nav>
  );
}

export default Menu;
