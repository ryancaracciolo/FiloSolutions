import React, {useState} from 'react';
import './Invite.css';

const Invite = ({partnerData, onClose, onInvite}) => {

    const [inviteConfirmed, setInviteConfirmed] = useState(false);

    const handleInvite = () => {
        if (inviteConfirmed) {
          return;
        } else {
          setInviteConfirmed(!inviteConfirmed);
          console.log("Invited!");
          onInvite();
    
          // Run onClose after 1 second (1000 milliseconds)
          setTimeout(() => {
            onClose();
          }, 1000);
        }
    };
      
    return (
        <div className='invite-wrapper'>
            <h3>{inviteConfirmed ? 'Invite Sent!' : 'Send Partner Invite?'}</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className='invite-yes' onClick={handleInvite}> Send </button>
                <button className='invite-no' onClick={onClose}> Cancel </button>
            </div>
        </div>
    );
};

export default Invite;