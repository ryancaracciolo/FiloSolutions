import React from 'react';
import './Partnerships.css';
import Card from '../../../Components/Product/Card/Card';

const FindPartners = ({suggPartners, otherBusinesses, updatePartner}) => {
    
    return (
        <div className="partner-detail">
            {/* <div className="subheader">
                {suggPartners?.length > 0 ? <h2>Suggested Partners</h2> : <h2>Trouble Loading Businesses</h2>}
                {suggPartners?.length > 0 ? <p>♦ Powered by AI ♦</p> : null}
            </div>
            <div className="partner-cards">
                {suggPartners ? suggPartners.map(partner => (
                    <Card key={partner.id} partnerData={partner} status='Suggested' setStatus={updatePartner}/>
                )) : null}
            </div> */}

            <div className="subheader">
                {otherBusinesses?.length > 0 ? <h2>Businesses in Network</h2> : null}
            </div>
            <div className="partner-cards">
                {otherBusinesses ? otherBusinesses.map(partner => (
                    <Card key={partner.id} partnerData={partner} status={partner.status} setStatus={updatePartner}/>
                )) : null}
            </div>
        </div>
    );
};

export default FindPartners;