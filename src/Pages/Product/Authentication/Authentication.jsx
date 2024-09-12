import React, { useState, useEffect } from 'react';
import './Authentication.css';
import { signUp, signIn, confirmSignUp, getCurrentUser } from '@aws-amplify/auth';
import filoLogo from '../../../Assets/Images/FiloLogo.png';
import background from '../../../Assets/Images/background.png';
import ConfirmationCode from './ConfirmCode';

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
  const handleCodeSubmit = async (code) => {
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
        <div className="left-side">
          <div className="left-content">
            <img src={filoLogo} alt="Filo Logo" className="filo-logo" />
            <h1>Welcome to Filo!</h1>
            <p>
              Filo has partnered with your Chamber to help unlock new opportunities for you. 
              Your Chamber network is powerful, and we are here to help you leverage it to collaborate, grow, and thrive.
            </p>
            <hr />
            <h2>Ready to get started?</h2>
            <p className='sub-p'>
              Log in with your Chamber email to access your network and explore everything Filo has to offer.
            </p>
            <img src={background} alt="Filo Logo" className="login-background" />
          </div>
        </div>

        <div className="right-side">
          <div className="right-content">
            <h2>Start your journey with Filo</h2>
            <hr />
            <p>
              {step === 1 ? 'To begin using Filo, please enter your business email address associated with your Chamber of Commerce Membership.' : 'Enter the verification code sent to your email.'}
            </p>

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
              <ConfirmationCode onConfirm={handleCodeSubmit} />
            )}

            {error && <p className="error-message">{error}</p>}

            <p className="support-text">
              Have questions? Please contact <a href="mailto:support@filo.com">support@filo.com</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
}

export default Authentication;
