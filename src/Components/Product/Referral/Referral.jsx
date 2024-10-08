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
            <div className="referral-header">
                <button className={'toggle-btn ' + (toCust ? 'active' : '')} onClick={() => handleToggle('customer')}>Share to Lead</button>
                <button className={'toggle-btn ' + (!toCust ? 'active' : '')} onClick={() => handleToggle('business')}>Refer Customer</button>
            </div>
            {toCust ? <PartnerRef partnerData={partnerData} changePage={setToCustomer}/> : <CustomerRef partnerData={partnerData} changePage={setToCustomer}/>}
        </div>
    );
};

export default Referral;