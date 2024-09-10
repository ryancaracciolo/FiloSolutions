import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { ReactComponent as DashboardIcon } from '../../../Assets/Icons/dashboard-icon.svg';
import { ReactComponent as PartnershipIcon } from '../../../Assets/Icons/handshake-icon.svg';
import { ReactComponent as OpportIcon } from '../../../Assets/Icons/lightbulb-icon.svg';
import { ReactComponent as CollabIcon } from '../../../Assets/Icons/collab-icon.svg';



function Menu() {
    return (
        <nav className='ProductMenu'>
            <ul>
                <li><Link to="/app/dashboard">
                    <DashboardIcon className='menu-icon' />
                    <p>Dashboard</p>
                </Link></li>
                <li><Link to="/app/partnerships">
                    <PartnershipIcon className='menu-icon' />
                    <p>Partnerships</p>
                </Link></li>
                <li><Link to="/app/opportunities">
                    <OpportIcon className='menu-icon' />
                    <p>Opportunities</p> 
                </Link></li>
                <li><Link to="/app/collab">
                    <CollabIcon className='menu-icon' />
                    <p>Collab</p> 
                </Link></li>
            </ul>
        </nav>
    );
};

export default Menu;