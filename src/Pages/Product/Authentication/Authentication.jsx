import React, { useState, useEffect } from 'react';
import './Authentication.css';
import { signUp, signIn, confirmSignUp, getCurrentUser } from '@aws-amplify/auth';

function Authentication({ children }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(''); // To store the verification code
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter code
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if a user is already authenticated
    getCurrentUser()
      .then(user => setUser(user))
      .catch(() => console.log('No user logged in'));
  }, []);

  // Step 1: Send verification code to the email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Register the user and send a verification code to their email
      let p = Math.random().toString(36).slice(-8);
      setPassword(p);
      await signUp({
        username: email, // use email as the username
        password: p, // Dummy password as Amplify requires it
        attributes: { email }, // Use email as the main attribute
      });
      console.log("Verification code sent to email");
      setStep(2); // Move to step 2: entering the verification code
    } catch (error) {
      setError(error.message);
    }
  };

  // Step 2: Confirm the sign-up with the verification code
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Confirm the sign-up using the email (as username) and code provided by the user
      await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      console.log("Email confirmed");
      // After confirming, sign the user in
      const signedInUser = await signIn({
        username: email,
        password: password
      });
      setUser(signedInUser); // Successfully signed in
      console.log("Successfully signed in");
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
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

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
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
          )}

          {step === 2 && (
            <form onSubmit={handleCodeSubmit}>
              <input
                type="text"
                className="code-input"
                placeholder="Enter verification code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">
                Confirm Code
              </button>
            </form>
          )}

          {error && <p className="error-message">{error}</p>}

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

  return (
    <div className='product-main'>
      {children}
    </div>
  );
}

export default Authentication;
