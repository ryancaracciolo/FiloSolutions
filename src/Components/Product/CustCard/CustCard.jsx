import React from 'react';
import './CustCard.css';
import Avatar from '../CircleInitials/CircleInitials'

const CustCard = ({ formData }) => {

    return (
        <div className="cust-card">
            <Avatar businessName={formData.name ? formData.name : 'Lead Name'} size='60px' fontSize='20px' />
            
            <div className="details">
                <h3 type="text" id="name">{formData.name ? formData.name : 'Lead Name'}</h3>
                <h3 type="email" id="email">{formData.email ? formData.email : 'example@gmail.com'}</h3>
                <h3 type="phone" id="phone">{formData.phone ? formData.phone : '(555) 555-5555'}</h3>
            </div>
        </div>
    );
};

export default CustCard;