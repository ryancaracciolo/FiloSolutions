import React from 'react';
import './PartnerRef.css';
import Card from '../Card/Card'
import { ReactComponent as CopyIcon } from '../../../Assets/Icons/copy-icon.svg';

function PartnerRef({partnerData}) {

    function handleCopy() {
        console.log("Copied!");
    }

    function handlePartnerClick() {
        console.log("Partner Transition");
    }

    return (
        <div className="partner-referral">
            {console.log(partnerData)}
            <button className='copy-card' onClick={() => handleCopy()}>Copy Card <CopyIcon className='copy-icon'/></button>
            <Card key='asdfasd' partnerData={partnerData} status='popped'/>
            <button className="referral-footer" onClick={() => handlePartnerClick()}>{'Record Lead in Filo >>'}</button>
        </div>
    );
};

export default PartnerRef;