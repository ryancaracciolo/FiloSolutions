import React, { useContext, useState } from 'react';
import './Header.css';
import logo from '../../../Assets/Images/FiloLogo.png';
import {ReactComponent as ProfileButton} from '../../../Assets/Icons/profile-icon.svg';
import { BusinessContext } from '../../../objects/UserContext/UserContext'; // Import the context
import Popup from '../Popup/Popup';
import Card from '../../../Components/Product/Card/Card';
import {dummyBusiness} from '../../../objects/test-objects/test-objects';

const Header = () => {
    const { business } = useContext(BusinessContext);
    const [showPopup, setShowPopup] = useState(false); // popup state
    
    const handleProfileClick = () => {
        setShowPopup(!showPopup);
    };

    // const handleEdit = () => {
    //     console.log("Edit Clicked");
    // };
    

    return (
        <header className='product-header'>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Filo Logo" />
                </div>
                <div className="search-bar-container">
                    <input type="text" placeholder="Search for Anything..." className="search-bar" />
                </div>
                <button className="profile-button" onClick={handleProfileClick}>
                    <h3>{business.name}</h3>
                    <ProfileButton className='header-button' />
                </button>
            </div>
            {showPopup ? <Popup content={
                <div className='user-profile-wrapper'>
                    <div className='user-profile-header'>
                        <h2>My Profile Info</h2>
                        {/*<button onClick={handleEdit}>Edit</button>*/}
                    </div>
                    <Card key={business.id} partnerData={business} status='self'/>
                </div>
            } onClose={handleProfileClick} /> : null }
        </header>
    );
};

export default Header;