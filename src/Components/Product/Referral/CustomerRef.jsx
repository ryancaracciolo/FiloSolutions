import React from 'react';
import CustCard from '../CustCard/CustCard';
import './CustomerRef.css'

function CustomerRef({partnerData}) {

    function handleSubmit() {
        console.log("Submitted!");
    }

    return (
        <div className="customer-referral">
            <button className='cust-referral-header'>Refer Customer to Partner</button>
            <CustCard />
            <input className="cust-note"type="text" placeholder="Note (Optional):" />
            <div className='acknowledge-statement'>
                <div><input type="acknowledge-checkbox" /></div>
                <p>I acknowledge customer info will be shared with Partner</p>
            </div>
            <button className="cust-referral-footer" onClick={() => handleSubmit()}>{'Submit'}</button>
        </div>
    );
};

export default CustomerRef;