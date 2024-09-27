import React from 'react';
import './CustCard.css';

const CustCard = ({ formData, onChange }) => {


    return (
        <div className="cust-card">
            <div className="avatar">
                <span className="initials">CN</span>
            </div>
            <div className="details">
                <input type="text" id="name" placeholder="[Customer Name]" value={formData.name} onChange={onChange} />
                <input type="email" id="email" placeholder="[Customer Email]" value={formData.email} onChange={onChange} />
                <input type="tel" id="phone" placeholder="[Customer Phone]" value={formData.phone} onChange={onChange} />
            </div>
        </div>
    );
};

export default CustCard;