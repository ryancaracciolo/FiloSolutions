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
import Invite from '../Invite/Invite';

const Card = ({partnerData, status, setStatus}) => {
    
    let topLeftButton;
    let topRightButton;
    let cardFooter;

    const [showPopup, setShowPopup] = useState(false); // popup state
    const [showShare, setShowShare] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const toggleShare = () => {
        setShowShare(!showShare);
    }

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    }

    const handleCopy = () => {
        console.log("asdfadssfadsasd");
    }

    const handleQR = () => {
        console.log("QR!!!!!!!!!!!");
    }

    const handleInviteUI = () => {
        setStatus()
    }

    /////////// Rendering logic for Card variants //////////////////
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
        topLeftButton = <CheckIcon className={'card-icon check-icon'}/>;
        topRightButton = <ShareIcon className={'card-icon share-icon'} onClick={toggleShare}/>;
        cardFooter =
            <div className='card-footer' onClick={togglePopup}>
                <button className='card-footer-content'>Send Referral ➔</button>
            </div>;
    }
    else if (status==='suggested') {
        topLeftButton = <AddIcon className={'card-icon add-icon'} onClick={toggleAdd}/>;
        topRightButton = <ShareIcon className={'card-icon share-icon'}/>;
        cardFooter =
            <div className={'card-footer'} onClick={togglePopup}>
                <button className='card-footer-content'>Send Referral ➔</button>
            </div>;
    }
    else if (status==='self') {
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
    //////////////////////////////////

    return (
        <div className={'card active'}>
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
                    <EmailIcon className='info-icon email'/>
                    <PhoneIcon className='info-icon phone'/>
                    <LocIcon className='info-icon loc'/>
                    <LinkIcon className='info-icon link'/>
                </div>
                <p className="description">{partnerData.desc}</p>
            </div>
            {cardFooter}
            {showPopup ? <Popup content={<Referral partnerData={partnerData} closeClicked={togglePopup} toCustomer={false}/>}
            onClose={togglePopup} /> : null}
            {showShare ? <Popup content={<Referral partnerData={partnerData} closeClicked={toggleShare} toCustomer={true}/>}
            onClose={toggleShare} /> : null}
            {showAdd ? <Popup content={
                <Invite partnerData={partnerData} onClose={toggleAdd} onInvite={handleInviteUI}/>
            } onClose={toggleAdd} /> : null}
        </div>    
    );
};

export default Card;