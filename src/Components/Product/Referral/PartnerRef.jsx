import React, {useState, useEffect} from 'react';
import './PartnerRef.css';
import Card from '../Card/Card'
import { ReactComponent as CopyIcon } from '../../../Assets/Icons/copy-icon.svg';

function PartnerRef({partnerData, changePage}) {
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText('http://localhost:3000/referral/'+partnerData.id);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const createLink = () => {
    }

    return (
        <div className="partner-referral">
            {console.log(partnerData)}
            <button className='copy-card' onClick={() => handleCopy()}>{copied ? 'Copied!' : 'Copy Card'}<CopyIcon className='copy-icon'/></button>
            <Card key='asdfasd' partnerData={partnerData} status='popped'/>
            <button className="referral-footer" onClick={() => changePage(false)}>{'Record Lead in Filo >>'}</button>
        </div>
    );
};

export default PartnerRef;