import React from 'react';
import './Partnerships.css';
import Card from '../../../Components/Product/Card/Card';

const Invites = ({pendingSent, pendingReceived, updatePartner}) => {  
    
    return (
        <div className="partner-detail">
            <div className="subheader">
                <h2>My Partnership Invites</h2>
                <p>({pendingSent.length + pendingReceived.length} active)</p>
            </div>
            {(pendingReceived.length === 0 && pendingSent.length === 0) ? (<div className='no-partners'>No Pending Invites</div>) : null}
            <div className="partner-cards">
                {pendingReceived ? pendingReceived.map(partner => (
                    <Card key={partner.id} partnerData={partner} status='Pending_Received' setStatus={updatePartner}/>
                )) : null}
                {pendingSent ? pendingSent.map(partner => (
                    <Card key={partner.id} partnerData={partner} status='Pending_Sent' setStatus={updatePartner}/>
                )) : null}
            </div>
        </div>
    );
};

export default Invites;