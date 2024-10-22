import React, { useContext, useState } from 'react';
import './Header.css';
import logo from '../../../Assets/Images/Filo-Logo-white.png';
import {ReactComponent as DownIcon} from '../../../Assets/Icons/down-icon.svg';
import {ReactComponent as SettingsIcon} from '../../../Assets/Icons/settings-icon.svg';
import {ReactComponent as BellIcon} from '../../../Assets/Icons/bell-icon.svg';

import { BusinessContext, SearchContext } from '../../../objects/UserContext/UserContext'; // Import the context
import Popup from '../Popup/Popup';
import Card from '../../../Components/Product/Card/Card';
import CircleInitials from '../CircleInitials/CircleInitials'

const Header = () => {
    const { business } = useContext(BusinessContext);
    const { searchText, setSearchText } = useContext(SearchContext);
    const [showPopup, setShowPopup] = useState(false); // popup state
     
    
    const handleProfileClick = () => {
        setShowPopup(!showPopup);
    };

    const handleSearch = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        if (value) {
            setSearchText(value);
        } else {
            setSearchText(''); 
        }
    };

    return (
        <header className='product-header'>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Filo Logo" />
                </div>
                <div className="search-bar-container">
                    <input type="text" placeholder="Search for Anything..." className="search-bar" value={searchText} onChange={handleSearch} />
                </div>
                <div className='button-container'>
                    <BellIcon className='header-button'/>
                    <SettingsIcon className='header-button'/>
                    <button className="profile-button" onClick={handleProfileClick}>
                        <CircleInitials businessName={business.name}/>
                        <h3>{business.name}</h3>
                        <DownIcon className='header-button'/>
                    </button>
                </div>
            </div>
            {showPopup ? <Popup content={
                <div className='user-profile-wrapper'>
                    <div className='user-profile-header'>
                        <h2>My Card Info</h2>
                        {/*<button onClick={handleEdit}>Edit</button>*/}
                    </div>
                    <Card key={business.id} partnerData={business} status='Self'/>
                </div>
            } onClose={handleProfileClick} /> : null }
        </header>
    );
};

export default Header;