import React from 'react';
import './Partnerships.css';
import '../../../Components/Product/Content/Content.css';
import Card from '../../../Components/Product/Card/Card';
import {dummyBusinesses} from '../../../objects/test-objects/test-objects';

function Partnerships() {
    const partners = dummyBusinesses(3);
    const suggPartners = dummyBusinesses(6);

    return (
        <div className="content partnerships">
            <div className="content-header">
                <h1>Partners</h1>
            </div>
            <div className="content-detail">
                <div className="subheader">
                    <h2>My Partners</h2>
                    <p>({partners.length} active)</p>
                </div>
                <div className="partner-cards">
                    {partners.map(partner => (
                        <Card key={partner.id} partnerData={partner} status='partner'/>
                    ))}
                </div>
                <div className="subheader">
                    {suggPartners ? <h2>SuggestedPartners</h2> : null}
                    {suggPartners ? <p>♦ Powered by AI ♦</p> : null}
                </div>
                <div className="partner-cards">
                    {suggPartners.map(partner => (
                        <Card key={partner.id} partnerData={partner} status='suggested'/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partnerships;