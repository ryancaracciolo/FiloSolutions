import React from 'react';
import './CustCard.css';

const CustCard = ({ formData, onChange }) => {


    return (
        <div className="cust-card">
            <div className="avatar">
                <span className="initials">CN</span>
            </div>
            <div className="details">
                <h3 type="text" id="name" placeholder="[Customer Name]">{formData.name}</h3>
                <h3 type="email" id="email" placeholder="[Customer Email]">{formData.email}</h3>
                <h3 type="tel" id="phone" placeholder="[Customer Phone]" >{formData.phone}</h3>
            </div>
        </div>
    );
};

export default CustCard;