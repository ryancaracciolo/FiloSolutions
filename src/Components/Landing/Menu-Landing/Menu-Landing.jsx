import React from 'react';
import { Link } from 'react-router-dom';
import './Menu-Landing.css';
import { ReactComponent as ArrowIcon} from '../../../Assets/Icons/arrow-right-icon.svg'

function Menu({isOpen, onMenuClosed}) {
  return (
    <nav className={`menu ${isOpen ? 'open' : 'closed'}`}>
        <div className="close-Menu" onClick={onMenuClosed}>
            <span id="x1"></span>
            <span id="x2"></span>    
        </div>
        <ul>
          <li onClick={onMenuClosed}>
            <a href="#home">Chambers of Commerce</a>
            <ArrowIcon className="arrow-icon" />
          </li>
          <li onClick={onMenuClosed}>
            <Link to="/app/login" className="about">Chamber Members</Link>
            <ArrowIcon className="arrow-icon" />
          </li>
          <li onClick={onMenuClosed}>
            <a href="#how-it-works">How It Works</a>
            <ArrowIcon className="arrow-icon" />
          </li>
          <li onClick={onMenuClosed}>
            <a href="#contact">Contact</a>
            <ArrowIcon className="arrow-icon" />
          </li>
        </ul>
        <hr/>
        <div className="auth-buttons">
          <Link to="/app/login" className="register">Register</Link>
            <Link to="/app/login" className="sign-in">Sign In</Link>
        </div>
  </nav>
  );
}

export default Menu;
