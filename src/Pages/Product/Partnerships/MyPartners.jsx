import React from 'react';
import './Partnerships.css';
import Card from '../../../Components/Product/Card/Card';

const MyPartners = ({partners, suggPartners, updatePartner}) => {
    
    return (
        <div className="partner-detail">
            <div className="subheader">
                <h2>My Partners</h2>
                <p>({partners.length} active)</p>
            </div>
            {!partners ? <div className='no-partners'>Invite other members to create your first partnership!</div> : null}
            <div className="partner-cards">
                {partners ? partners.map(partner => (
                    <Card key={partner.id} partnerData={partner} status='Partner' setStatus={updatePartner}/>
                )) : null}
            </div>
            <div className="subheader">
                {suggPartners ? <h2>Suggested Partners</h2> : null}
                {suggPartners ? <p>♦ Powered by AI ♦</p> : null}
            </div>
            <div className="partner-cards">
                {suggPartners ? suggPartners.map(partner => (
                    <Card key={partner.id} partnerData={partner} status='Suggested' setStatus={updatePartner}/>
                )) : null}
            </div>
        </div>
    );
};

export default MyPartners;