import React, { useState } from 'react';
import './Invite.css';

const Invite = ({ onClose, onInvite }) => {
  const [yesClicked, setYesClicked] = useState(false);

  const handleInviteUI = () => {
    if (yesClicked) return;
    setYesClicked(true);
    // Close the component after a delay of 1 second
    setTimeout(handleInvite, 1000);
  };

  const handleInvite = () => {
    onInvite();
    onClose();
  };

  return (
    <div className='invite-wrapper'>
        <h3>{yesClicked ? 'Invite Sent!' : 'Send Partner Invite?'}</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className='invite-yes' onClick={handleInviteUI}>
            Send
          </button>
          <button className='invite-no' onClick={onClose}>
            Cancel
          </button>
        </div>
    </div>
  );
};

export default Invite;