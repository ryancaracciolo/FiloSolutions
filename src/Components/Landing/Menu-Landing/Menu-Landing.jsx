import React from 'react';
import { Link } from 'react-router-dom';
import './Menu-Landing.css';

function Menu({isOpen, onMenuClosed}) {
  return (
    <nav className={`menu ${isOpen ? 'open' : 'closed'}`}>
        <div className="close-Menu" onClick={onMenuClosed}>
            <span id="x1"></span>
            <span id="x2"></span>    
        </div>
        <ul>
          <li><a href="#home">Chambers of Commerce</a></li>
          <li><Link to="/app/login" className="about">Chamber Members</Link></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
  </nav>
  );
}

export default Menu;
