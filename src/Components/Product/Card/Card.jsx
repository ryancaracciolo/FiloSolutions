import React, {useState} from 'react';
import './Card.css';
import { ReactComponent as CheckIcon } from '../../../Assets/Icons/checkmark-icon.svg';
import { ReactComponent as AddIcon } from '../../../Assets/Icons/add-icon.svg';
import { ReactComponent as ShareIcon } from '../../../Assets/Icons/share-icon.svg';
import { ReactComponent as EmailIcon } from '../../../Assets/Icons/email-icon.svg';
import { ReactComponent as PhoneIcon } from '../../../Assets/Icons/phone-icon.svg';
import { ReactComponent as LocIcon } from '../../../Assets/Icons/location-icon.svg';
import { ReactComponent as LinkIcon } from '../../../Assets/Icons/link-icon.svg';
import { ReactComponent as CopyIcon } from '../../../Assets/Icons/copy-icon.svg';
import { ReactComponent as QRIcon } from '../../../Assets/Icons/qr-icon.svg';
import Referral from '../Referral/Referral';
import Popup from '../Popup/Popup';

const Card = ({partnerData, status, isPopped}) => {

    const [showPopup, setShowPopup] = useState(false); // popup state

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleCopy = () => {
        console.log("asdfadssfadsasd");
    }

    const handleQR = () => {
        console.log("QR!!!!!!!!!!!");
    }

    /////////// Rendering logic for Card variants ///////////////////
    let topLeftButton;
    let topRightButton;
    let cardFooter;
    
    if (status==='popped') {
        topLeftButton = null;
        topRightButton = null;
        cardFooter = 
            <div className='card-footer-popped'>
                <button className='copy-link' onClick={() => handleCopy()}>
                    <LinkIcon className='copy-link-linkicon'/>
                    <span>'https://filosolutions.com/as/asdfads/fadsaf'</span>
                    <CopyIcon className='copy-link-copyicon'/>
                </button>
                <QRIcon className='qr-link' onClick={() => handleQR()}/>
            </div>;
    }
    else if(status==='partner') {
        topLeftButton = <CheckIcon className={'card-icon check-icon'+(isPopped ? ' hidden' : '')}/>;
        topRightButton = <ShareIcon className={'card-icon share-icon'}/>;
        cardFooter =
            <div className='card-footer' onClick={togglePopup}>
                <button className='card-footer-content'>Send Referral ➔</button>
            </div>;
    }
    else if (status==='suggested') {
        topLeftButton = <AddIcon className={'card-icon add-icon'+(isPopped ? ' hidden' : '')}/>;
        topRightButton = <ShareIcon className={'card-icon share-icon'}/>;
        cardFooter =
            <div className={'card-footer'} onClick={togglePopup}>
                <button className='card-footer-content'>Send Referral ➔</button>
            </div>;
    }
    else if (status==='self') {
        topLeftButton = null;
        topRightButton = null;
        cardFooter = null;
    }
    //////////////////////////////////

    return (
        <div className={'card'+(!isPopped ? ' active' : '')}>
            <div className="card-header">
                {topLeftButton}
                <img src={partnerData.logo} loading="lazy" alt="Company Logo" className="company-logo" />
                {topRightButton}
            </div>
            <div className="card-body">
                <h3 className="company-name">{partnerData.name}</h3>
                <p className="contact-name">{partnerData.owner}</p>
                <div className="tags">
                    <span className="tag home-services">{partnerData.industry}</span>
                </div>
                <div className="info-icons">
                    <EmailIcon className='email-icon'/>
                    <PhoneIcon className='phone-icon'/>
                    <LocIcon className='loc-icon'/>
                    <LinkIcon className='link-icon'/>
                </div>
                <p className="description">{partnerData.desc}</p>
            </div>
            {cardFooter}
            <Popup show={showPopup} content={
                <Referral partnerData={partnerData} closeClicked={togglePopup} toCustomer={false}/>
            } onClose={togglePopup} />
        </div>    
    );
};

export default Card;