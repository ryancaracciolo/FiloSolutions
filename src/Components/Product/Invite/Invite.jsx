import React, { useState } from 'react';
import './Invite.css';

const Invite = ({ onClose, onInvite }) => {
  const [yesClicked, setYesClicked] = useState(false);

  const handleInvite = () => {
    if (yesClicked) return;

    setYesClicked(true);
    onInvite();

    // Close the component after a delay of 1 second
    setTimeout(onClose, 1000);
  };

  return (
    <div className='invite-wrapper'>
        <h3>{yesClicked ? 'Invite Sent!' : 'Send Partner Invite?'}</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className='invite-yes' onClick={handleInvite}>
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