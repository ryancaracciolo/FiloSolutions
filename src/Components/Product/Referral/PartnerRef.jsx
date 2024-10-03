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

    return (
        <div className="partner-referral">
            <button className="partner-referral-header">Share partner details</button>
            <Card key='asdfasd' partnerData={partnerData} status='popped'/>
            <div className='referral-footer'>
                <button className="copy" onClick={handleCopy}>
                    <span>Copy Card</span>
                    <CopyIcon className='copy-icon'/>
                </button>
                <button className="record" onClick={() => changePage(false)}>{'Record Lead in Filo'}</button>
            </div>
        </div>
    );
};

export default PartnerRef;