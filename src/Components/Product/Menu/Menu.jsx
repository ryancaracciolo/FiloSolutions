import React, { useState, useContext } from 'react';
import { BusinessContext } from '../../../objects/UserContext/UserContext';
import { ReactComponent as HomeIcon } from '../../../Assets/Icons/profile-icon.svg';
import { ReactComponent as PartnershipIcon } from '../../../Assets/Icons/handshake-icon.svg';
import { ReactComponent as OpportIcon } from '../../../Assets/Icons/list-icon.svg';
import { ReactComponent as PurchIcon } from '../../../Assets/Icons/tag-icon.svg';
import { ReactComponent as CollabIcon } from '../../../Assets/Icons/collab-icon.svg';
import { ReactComponent as SignOutIcon } from '../../../Assets/Icons/logout-icon.svg';
import MenuItem from './MenuItem';
import './Menu.css';
import { signOut } from '@aws-amplify/auth';
import { Link } from 'react-router-dom';

function Menu({activeMenuIndex }) {
    const { setBusiness } = useContext(BusinessContext);
    const [selectedItem, setSelectedItem] = useState((activeMenuIndex ? activeMenuIndex : 0));


    const menuItems = [
        { label: 'Partners', icon: PartnershipIcon, path: '/app/partnerships' },
        { label: 'Referrals', icon: OpportIcon, path: '/app/opportunities' },
        { label: 'Group Purchase', icon: PurchIcon, path: '/app/opportunities' },
        { label: 'Collab', icon: CollabIcon, path: '/app/collab' },
    ];
    

    const handleMenuClicked = (index) => {
        setSelectedItem(index);
    }

     // Sign out function
    const handleSignOut = async () => {
        try {
        await signOut();
        localStorage.removeItem('business'); // Remove the business item from localStorage
        setBusiness(null);
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
            <li className='sign-out' onClick={() => {handleSignOut()}}>
                <Link to='app/login'>
                    <SignOutIcon className="menu-icon" />
                    <p>Sign Out</p>
                </Link>
            </li>
        </nav>
    );
}

export default Menu;