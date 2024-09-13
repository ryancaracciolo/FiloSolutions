import React from 'react';
import './Card.css';
import { ReactComponent as CheckIcon } from '../../../Assets/Icons/checkmark-icon.svg';
import { ReactComponent as AddIcon } from '../../../Assets/Icons/add-icon.svg';
import { ReactComponent as ShareIcon } from '../../../Assets/Icons/more-icon.svg';



const Card = ({partnerData, status}) => {

    return (
        <div className="card">
            <div className="card-header">
                {status==="partner" ? <CheckIcon className='card-icon check-icon'/> : <AddIcon className='card-icon add-icon'/>}
                <img src={partnerData.logo} loading="lazy" alt="Company Logo" className="company-logo" />
                <ShareIcon className='card-icon share-icon'/>
            </div>
            <div className="card-body">
                <h3 className="company-name">{partnerData.name}</h3>
                <p className="contact-name">{partnerData.owner}</p>
                <div className="tags">
                    <span className="tag home-services">Home Services</span>
                    <span className="tag building">Building</span>
                </div>
                <p className="description">
                {partnerData.desc}
                </p>
            </div>
            <div className="card-footer">
                <button className="send-referral">Send Referral ➔</button>
            </div>
        </div>    
    );
};

export default Card;