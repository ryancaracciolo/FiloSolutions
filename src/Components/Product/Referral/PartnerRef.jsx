import React, {useState, useEffect} from 'react';
import './PartnerRef.css';
import Card from '../Card/Card'
import { ReactComponent as CopyIcon } from '../../../Assets/Icons/copy-icon.svg';

function PartnerRef({partnerData, changePage}) {
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText((process.env.REACT_APP_BASE_URL)+'/referral/'+partnerData.id);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <div className="partner-referral">
            <button className="partner-referral-header">Share your partner's information <br></br>with a potential customer</button>
            <Card key='asdfasd' partnerData={partnerData} status='popped'/>
            <div className='referral-footer'>
                <button className="copy" onClick={handleCopy}>
                    <span>{copied ? 'Copied!' : 'Copy Card'}</span>
                    {copied ? null : <CopyIcon className='copy-icon'/>}
                </button>
                <button className="record" onClick={() => changePage(false)}>{'Record Lead in Filo'}</button>
            </div>
        </div>
    );
};

export default PartnerRef;