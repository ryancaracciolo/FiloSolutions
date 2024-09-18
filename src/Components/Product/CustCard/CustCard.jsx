import React, {useState} from 'react';
import './CustCard.css';

const CustCard = () => {


    return (
        <div className="cust-card">
            <div className="avatar">
                <span className="initials">CN</span>
            </div>
            <div className="details">
                <input type="text" id="cust-name" placeholder="[Customer Name]" />
                <input type="email" id="cust-email" placeholder="[Customer Email]" />
                <input type="tel" id="cust-phone" placeholder="[Customer Phone]" />
            </div>
        </div>
    );
};

export default CustCard;