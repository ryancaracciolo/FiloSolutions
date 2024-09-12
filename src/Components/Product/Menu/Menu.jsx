import React, { useState } from 'react';
import { ReactComponent as DashboardIcon } from '../../../Assets/Icons/dashboard-icon.svg';
import { ReactComponent as PartnershipIcon } from '../../../Assets/Icons/handshake-icon.svg';
import { ReactComponent as OpportIcon } from '../../../Assets/Icons/lightbulb-icon.svg';
import { ReactComponent as CollabIcon } from '../../../Assets/Icons/collab-icon.svg';
import { ReactComponent as SignOutIcon } from '../../../Assets/Icons/logout-icon.svg';
import MenuItem from './MenuItem';
import './Menu.css';
import { signOut } from '@aws-amplify/auth';

function Menu() {
    const menuItems = [
        { label: 'Dashboard', icon: DashboardIcon, path: '/app' },
        { label: 'Partnerships', icon: PartnershipIcon, path: '/app/partnerships' },
        { label: 'Opportunities', icon: OpportIcon, path: '/app/opportunities' },
        { label: 'Collab', icon: CollabIcon, path: '/app/collab' },
        { label: 'Sign Out', icon: SignOutIcon, path: '/app/collab' }
    ];
    
    const [selectedItem, setSelectedItem] = useState(0);

    const handleMenuClicked = (index) => {
        setSelectedItem(index);
    }

     // Sign out function
    const handleSignOut = async () => {
        try {
        await signOut();
        // Optionally, redirect to a login page after sign-out
        window.location.href = '/app/login';
        } catch (error) {
        console.log('Error signing out: ', error);
        }
    };

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
                        onClick={() => {
                            if (item.label === 'Sign Out') {
                                handleSignOut();
                            } else {
                                handleMenuClicked(index);
                            }
                        }}
                    />
                ))}
            </ul>
        </nav>
    );
}

export default Menu;