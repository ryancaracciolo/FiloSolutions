import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const MenuItem = ({ icon: Icon, label, to, isSelected, onClick }) => {
  return (
    <li className={isSelected ? 'menu-item active' : 'menu-item'} onClick={onClick}>
      <Link to={to}>
        <Icon className="menu-icon" />
        <p>{label}</p>
      </Link>
    </li>
  );
};

export default MenuItem;
