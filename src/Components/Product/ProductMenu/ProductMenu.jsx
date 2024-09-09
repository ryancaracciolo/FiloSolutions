import React from 'react';
import { Link } from 'react-router-dom';
import './ProductMenu.css';
import dashboardIcon from '../../../Assets/Icons/dashboard-icon.svg';
import partnershipIcon from '../../../Assets/Icons/handshake-icon.svg';
import opportIcon from '../../../Assets/Icons/lightbulb-icon.svg';
import collabIcon from '../../../Assets/Icons/collab-icon.svg';



function ProductMenu() {
    return (
        <nav className='ProductMenu'>
            <ul>
                <li><Link to="/app/dashboard">
                    <img src={dashboardIcon} alt="Dashboard" />
                    <p>Dashboard</p>
                </Link></li>
                <li><Link to="/app/partnerships">
                    <img src={partnershipIcon} alt="Partnerships" />
                    <p>Partnerships</p>
                </Link></li>
                <li><Link to="/Opportunities">
                    <img src={opportIcon} alt="Opportunities" />
                   <p>Opportunities</p> 
                </Link></li>
                <li><Link to="/collab">
                    <img src={collabIcon} alt="Collab" />
                   <p>Collab</p> 
                </Link></li>
            </ul>
        </nav>
    );
};

export default ProductMenu;