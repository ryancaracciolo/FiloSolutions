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
import HoverIcon from '../HoverIcon/HoverIcon';
import Referral from '../Referral/Referral';
import Popup from '../Popup/Popup';
import Confirm from '../Invite/Invite';
import Avatar from '../CircleInitials/CircleInitials';

const Card = ({partnerData, status, setStatus}) => {
    
    let topLeftButton;
    let topRightButton;
    let cardFooter;

    const [showPopup, setShowPopup] = useState(false); // popup state
    const [showShare, setShowShare] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [copied, setCopied] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const toggleShare = () => {
        setShowShare(!showShare);
    }

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    }

    const handleCopy = ({item}) => {
        navigator.clipboard.writeText(item);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const handleQR = () => {
        console.log("QR!!!!!!!!!!!");
    }

    const handlePartnerUpdate = (newStatus) => {
        console.log(partnerData);
        console.log(newStatus);
        console.log(status);
        setStatus({partnerId: partnerData.id, newStatus: newStatus, oldStatus: status});
    }

    /////////// Rendering logic for Card variants //////////////////
    if (status==='popped') {
        topLeftButton = null;
        topRightButton = null;
        cardFooter = null;
    }
    else if(status==='Confirmed') {
        topLeftButton = <CheckIcon className={'card-icon check-icon'}/>;
        topRightButton = <ShareIcon className={'card-icon share-icon'} onClick={toggleShare}/>;
        cardFooter =
            <div className='card-footer' onClick={togglePopup}>
                <button className='card-footer-content'>Send Referral</button>
            </div>;
    }
    else if (status==='Suggested' || status==='Other') {
        topLeftButton = <AddIcon className={'card-icon add-icon'} onClick={toggleAdd}/>;
        topRightButton = null;
        cardFooter =
            <div className={'card-footer'} onClick={toggleAdd}>
                <button className='card-footer-content' style={{backgroundColor: 'var(--purple-color', borderRadius: '10px'}}>Send Partner Invite</button>
            </div>;
    }

    else if (status==='Pending_Sent') {
        topLeftButton = <div className={'card-icon pending_sent-icon'}>Sent</div>;
        topRightButton = null;
        cardFooter =
            <div className={'card-footer'} style={{backgroundColor: 'lightGrey'}}>
                <button className='card-footer-content' style={{color: 'var(--grey-dark-color'}}>Pending</button>
            </div>;
    }
    else if (status==='Pending_Received') {
        topLeftButton = <div className={'card-icon pending_received-icon'}>Received</div>;
        topRightButton = null;
        cardFooter =
            <div className={'card-footer'} style={{backgroundColor: 'var(--gold-dark-color)'}} onClick={() => handlePartnerUpdate('Confirmed')}>
                <button className='card-footer-content'>Accept Invite</button>
            </div>;
    }
    else if (status==='Referral') {
        topLeftButton = null;
        topRightButton = null;
        cardFooter =
        <div className={'card-footer'} onClick={() => handleCopy({item: partnerData.email})}>
            <button className='card-footer-content'>{copied ? "Email Copied to Clipboard!" : "Contact Representative"}</button>
        </div>;
    }
    else if (status==='Self') {
        topLeftButton = null;
        topRightButton = null;
        cardFooter = null;
    }

    return (
        <div className={'card active'}>
            <div className="card-header">
                {topLeftButton}
                <Avatar className="company-logo" businessImg={"x"} businessName={partnerData.name} size={'80px'} fontSize={'25px'}/>
                {topRightButton}
            </div>
            <div className="card-body">
                <h3 className="company-name">{partnerData.name}</h3>
                <p className="contact-name">{partnerData.owner}</p>
                <div className="tags">
                    <span className="tag home-services">{partnerData.industry}</span>
                </div>
                <div className="info-icons">
                    <HoverIcon IconComponent={EmailIcon} label={partnerData.email} />
                    <HoverIcon IconComponent={PhoneIcon} label={partnerData.phone} />
                    <HoverIcon IconComponent={LocIcon} label={partnerData.address} />
                    <HoverIcon IconComponent={LinkIcon} label={partnerData.website} />
                </div>
                <p className="description">{partnerData.desc}</p>
            </div>
            {cardFooter}
            {showPopup ? <Popup content={<Referral partnerData={partnerData} closeClicked={togglePopup} toCustomer={false}/>}
            onClose={togglePopup} /> : null}
            {showShare ? <Popup content={<Referral partnerData={partnerData} closeClicked={toggleShare} toCustomer={true}/>}
            onClose={toggleShare} /> : null}
            {showAdd ? <Popup content={<Confirm onClose={toggleAdd} onInvite={() => handlePartnerUpdate('Pending_Sent')} />} 
            onClose={toggleAdd} /> : null}
        </div>    
    );
};

export default Card;