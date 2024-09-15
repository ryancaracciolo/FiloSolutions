import React, {useState} from 'react';
import './Referral.css';
import Card from '../Card/Card'
import { ReactComponent as CopyIcon } from '../../../Assets/Icons/copy-icon.svg';

function Referral({partnerData, closeClicked}) {
    const [toCustomer, setToCustomer] = useState(true);
    const partner = partnerData;

    function handleToggle(clicked) {
        if (clicked==='customer' & !toCustomer) {
            setToCustomer(!toCustomer);
        }
        if (clicked==='business' & toCustomer) {
            setToCustomer(!toCustomer);
        }
    }

    function handleCopy() {
        console.log("Copied!");
    }

    function handlePartnerClick() {
        console.log("Partner Transition");
    }

    return (
        <div className="referral-popup">
            <button className="close-btn" onClick={closeClicked}>X</button>
            <div className="referral-header">
                <button className={'toggle-btn ' + (toCustomer ? 'active' : '')} onClick={() => handleToggle('customer')}>To Customer</button>
                <button className={'toggle-btn ' + (!toCustomer ? 'active' : '')} onClick={() => handleToggle('business')}>To Partner</button>
            </div>
            <div className="referral-content">
                <button className='copy-card' onClick={() => handleCopy()}>Copy Card <CopyIcon className='copy-icon'/></button>
                <Card key='asdfasd' partnerData={partner} status='null' isPopped='true'/>
            </div>
            <button className="referral-footer" onClick={() => handlePartnerClick()}>{'Share Lead with Partner >>'}</button>
        </div>
    );
};

export default Referral;