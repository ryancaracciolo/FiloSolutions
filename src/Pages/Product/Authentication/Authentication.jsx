import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';
import { signUp, signIn, confirmSignUp, getCurrentUser } from '@aws-amplify/auth';
import filoLogo from '../../../Assets/Images/FiloLogo.png';
import background from '../../../Assets/Images/background.png';
import ConfirmationCode from './ConfirmCode';


function Authentication({setUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter code
  const [error, setError] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between sign-in and sign-up
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
  const [loading, setLoading] = useState(true); // loading state to track authentication check
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a user is already authenticated
    getCurrentUser()
      .then(user => {
        console.log('User Found');
        setUser(user);
        setLoading(false); // Authentication check complete
        navigate('/app'); // Redirect after login
      })
      .catch(() => {
        console.log('No user logged in');
        setLoading(false); // No user logged in, stop loading
      });
  }, []);
  
  if (loading) {
    // Display loading spinner or message until the authentication check is complete
    console.log('Loading...');
    return <div className="loading">Loading...</div>;
  }

  const handleEmailSubmit = async (e) => {
    console.log('Email Submit');
    e.preventDefault();
    setError(null);
    
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      if (isSignIn) {
        // Sign in flow
        await signIn({ username: email, password });
        const user = await getCurrentUser();
        console.log("Successfully signed in: ", { user });
        setUser(user);
        navigate('/app'); // Redirect after login
      } else {
        // Sign up flow
        await signUp({
          username: email,
          password, // Dummy password for sign-up
          attributes: { email }, // User attribute
        });
        console.log("Verification code sent to email");
        setStep(2); // Move to step 2: verification code
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false); // Enable submitting again
    }
  };

  const handleCodeSubmit = async (code) => {
    setError(null);

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      // Confirm sign-up
      await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      console.log("Email confirmed");

      // Automatically sign the user in after confirmation
      await signIn({ username: email, password });
      const user = await getCurrentUser();
      console.log("Successfully signed in");
      setUser(user);
      navigate('/app'); // Redirect to app after login
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {isSignIn
              ? 'Log in with your Chamber email to access your network and explore everything Filo has to offer.'
              : 'Sign up with your Chamber email to access your network and explore everything Filo has to offer.'}
          </p>
          <img src={background} alt="Filo Logo" className="login-background" />
        </div>
      </div>

      <div className="right-side">
        <div className="right-content">
          <h2>{isSignIn ? 'Log in to Filo' : 'Start your Journey with Filo'}</h2>
          <hr />
          <p>
            {step === 1
              ? `${isSignIn ? 'Please enter your email and password associated with your account' : 'To begin using Filo, please enter your business email address associated with your Chamber of Commerce Membership'}`
              : 'Enter the verification code sent to your email.'}
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
              <input
                type="password"
                className="password-input"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">
                {isSignIn ? 'Log In' : 'Sign Up'}
              </button>
            </form>
          )}

          {step === 2 && !isSignIn && (
            <ConfirmationCode onConfirm={handleCodeSubmit} />
          )}

          {error && <p className="error-message">{error}</p>}

          <button className="toggle-auth-mode" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? 'Don’t have an account? Sign Up' : 'Already have an account? Log In'}
          </button>

          <p className="support-text">
            Have questions? Please contact <a href="mailto:support@filo.com">support@filo.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
