import React, {useState} from 'react';
import './Referral.css';
import PartnerRef from './PartnerRef';
import CustomerRef from './CustomerRef';


function Referral({partnerData, closeClicked, toCustomer}) {
    const [toCust, setToCustomer] = useState(toCustomer);

    function handleToggle(clicked) {
        if (clicked==='customer' & !toCust) {
            setToCustomer(!toCust);
        }
        if (clicked==='business' & toCust) {
            setToCustomer(!toCust);
        }
    }

    return (
        <div className="referral-popup">
            <button className="close-btn" onClick={closeClicked}>X</button>
            <div className="referral-header">
                <button className={'toggle-btn ' + (toCust ? 'active' : '')} onClick={() => handleToggle('customer')}>Share Business Card</button>
                <button className={'toggle-btn ' + (!toCust ? 'active' : '')} onClick={() => handleToggle('business')}>Refer Customer</button>
            </div>
            {toCust ? <PartnerRef partnerData={partnerData}/> : <CustomerRef partnerData={partnerData}/>}
        </div>
    );
};

export default Referral;