import React, { useState } from 'react';
import './Authentication'; // Optional CSS file to style the form

function Login() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add logic here for what happens on form submit
    console.log('Submitted email:', email);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src="/path-to-your-envelope-icon.png" alt="Envelope Icon" className="login-icon" />
          <h2>Email Confirmation</h2>
          <p>
            To begin using Filo, please enter your business email address associated with your Chamber of Commerce Membership.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="email-input"
            placeholder="Enter email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        <p className="support-text">
          For support, please contact <a href="mailto:support@filo.com">support@filo.com</a>
        </p>

        <div className="progress-bar">
          <div className="progress-fill" />
        </div>
      </div>
    </div>
  );
}

export default Login;