import React, { useState } from 'react';
import CustCard from '../CustCard/CustCard';
import './CustomerRef.css';
import axios from 'axios';

function CustomerRef({ partnerData }) {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [showWarning, setShowWarning] = useState(false); // State to manage the warning message

  // Handle form submission
  function handleSubmit() {
    if (!isChecked) {
      setShowWarning(true); // Show warning when checkbox is not checked
      return;
    } else {
      setShowWarning(false); // Hide warning if checked
      console.log('Submitted!');
      console.log('Form Data:', formData);
      // Perform further actions with formData
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setShowWarning(false); // Hide warning once checkbox is checked
    }
  };

  // Handle input changes in CustCard
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <div className="customer-referral">
      <button className="cust-referral-header">Refer Customer to Partner</button>
      <CustCard formData={formData} onChange={handleInputChange} />
      <textarea className="cust-note" type="text" placeholder="Note (Optional):" />
      <div className="acknowledge-statement">
        <input
          type="checkbox"
          id="acknowledge-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div>
            <p>I acknowledge customer info will be shared with Partner</p>
            {showWarning && (<p className="warning-text">Please acknowledge to Submit.</p>)}
        </div>
      </div>
      <button className="cust-referral-footer" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default CustomerRef;
