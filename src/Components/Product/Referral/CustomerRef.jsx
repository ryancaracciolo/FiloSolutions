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
        const response = await axios.post((process.env.REACT_APP_API_BASE_URL)+'/api/leads/create-lead', {
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
        }, 1000); 
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value;
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
  
    // Remove all non-digit characters from the input
    const phoneNumber = value.replace(/[^\d]/g, '');
  
    // Format the cleaned number as (XXX) XXX-XXXX
    const phoneNumberLength = phoneNumber.length;
  
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };
  

  return (
    <div className="customer-referral">
      <button className="cust-referral-header">Refer Customer to Partner</button>
      {(!isSubmitted) ? (
        <>
          <CustCard formData={formData} onChange={handleInputChange} />
          <form className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Lead Name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Lead Email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-full"
              required
            />
          
            <input
              type="tel"
              name="phone"
              placeholder="Lead Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-full"
              required
            />
            <textarea
              name="note"
              placeholder="Note (Optional)..."
              value={formData.note}
              onChange={handleInputChange}
              className="textarea-full"
            />
          </form>
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
        </>
      ) : (
        <div className="cust-referral-header">Submitted!</div>
      )}
      <button className="cust-referral-footer" onClick={handleSubmit}>
        {isSubmitted ? 'Submitted!' : 'Send Lead'}
      </button>
    </div>
  );
}

export default CustomerRef;
