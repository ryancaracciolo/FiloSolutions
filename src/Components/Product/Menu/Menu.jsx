import React, { useState } from 'react';
import { ReactComponent as DashboardIcon } from '../../../Assets/Icons/dashboard-icon.svg';
import { ReactComponent as PartnershipIcon } from '../../../Assets/Icons/handshake-icon.svg';
import { ReactComponent as OpportIcon } from '../../../Assets/Icons/lightbulb-icon.svg';
import { ReactComponent as CollabIcon } from '../../../Assets/Icons/collab-icon.svg';
import MenuItem from './MenuItem';
import './Menu.css';

function Menu() {
    const menuItems = [
        { label: 'Dashboard', icon: DashboardIcon, path: '/app/dashboard' },
        { label: 'Partnerships', icon: PartnershipIcon, path: '/app/partnerships' },
        { label: 'Opportunities', icon: OpportIcon, path: '/app/opportunities' },
        { label: 'Collab', icon: CollabIcon, path: '/app/collab' }
    ];
    
    const [selectedItem, setSelectedItem] = useState(0);

    const handleMenuClicked = (index) => {
        setSelectedItem(index);
    }

    return (
        <nav className='ProductMenu'>
            <ul>
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        to={item.path}
                        isSelected={selectedItem === index}
                        onClick={() => handleMenuClicked(index)}
                    />
                ))}
            </ul>
        </nav>
    );
}

export default Menu;