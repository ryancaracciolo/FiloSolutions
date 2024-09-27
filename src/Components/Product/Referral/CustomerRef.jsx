import React, { useState, useContext } from 'react';
import { BusinessContext } from '../../../objects/UserContext/UserContext';
import CustCard from '../CustCard/CustCard';
import './CustomerRef.css';
import axios from 'axios';

function CustomerRef({ partnerData }) {
  const { business } = useContext(BusinessContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', note: '' });
  const [showWarning, setShowWarning] = useState(false); // State to manage the warning message

  const createLead = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/leads/create-lead', {
            businessId: business.id,
            otherBusinessId: partnerData.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            note: formData.note,
            status: 'New',
        });
        console.log('Lead updated successfully:', response.data);
        setFormData({ name: '', email: '', phone: '', note: '' });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 600); 
      } catch (error) {
        console.error('Error updating Lead:', error.response?.data || error.message);
    }
};
  
  // Handle form submission
  function handleSubmit() {
    if (isSubmitted) { return; }
    if (!isChecked) {
      setShowWarning(true); // Show warning when checkbox is not checked
      return;
    } else {
      setShowWarning(false); // Hide warning if checked
      setIsSubmitted(true);
      createLead();
      console.log('Form Data:', formData);
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
      <textarea className="cust-note" id="note" type="text" placeholder="Note (Optional):" value={formData.note} onChange={handleInputChange} />
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
        {isSubmitted ? 'Submitted!' : 'Submit'}
      </button>
    </div>
  );
}

export default CustomerRef;
