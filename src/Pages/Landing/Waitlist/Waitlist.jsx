import React, { useState, useEffect } from 'react';
import './Waitlist.css';
import filoLogo from '../../../Assets/Images/FiloLogo.png';
import background from '../../../Assets/Images/background.png';
import { ReactComponent as EmailIcon } from '../../../Assets/Icons/email-icon.svg';
import { ReactComponent as IdIcon } from '../../../Assets/Icons/id-icon.svg';
import LoadingScreen from '../../../Components/Product/LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Waitlist() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  }, []);
  
  if (loading) {
    console.log('Loading...');
    return <LoadingScreen isLoading={loading}/>;
  }

  const handleJoin = async (e) => {
    setJoinedWaitlist(true);
    setEmail('');
    setFullName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJoinedWaitlist(true);
    try {
        const response = await axios.post('http://localhost:3001/api/waitlist/add-user', {
        fullName,
        email,
      });
      
      if (response.status === 201) {
        setMessage('Thank you for joining the waitlist!');
        setFullName('');  // Clear the form after successful submission
        setEmail('');
      } else {
        setMessage('An unexpected issue occurred, please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('You are already on the waitlist!');
      } else {
        console.error('Error submitting form:', error);
        setMessage('Something went wrong, please try again later.');
      }
    }
  };
  

  return (
    <div className="login-container">
        <div className="left-side">
            <div className="left-content">
                <img src={filoLogo} alt="Filo Logo" className="filo-logo" />
                <h1>Join Waitlist Today!</h1>
                <p>
                Filo is partnering with select Chambers of Commerce to bring a powerful 
                collaboration platform to local businesses.
                </p>
                <hr />
                <p className='sub-p'> By joining the waitlist, you’ll 
                be among the first to experience streamlined business referrals, partnerships, 
                and growth opportunities within your community. </p>
                <img src={background} alt="Filo Logo" className="login-background" />
            </div>
        </div>

        <div className="right-side">
            {joinedWaitlist ? (
                <div className="right-content">
                    <h2>Thanks for Joining the Filo Waitlist!</h2>
                    <div className='dots'>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                    <p>We will reach out to you shortly with more detail.</p>

                    {error && <p className="error-message">{error}</p>}

                    <Link to="/" className="back-btn">Back to Site</Link>

                    <p className="support-text">
                        Have questions? Please contact <a href="mailto:ryan@filosolutions.co">ryan@filosolutions.co</a>
                    </p>
                </div>
            ) : (
                <div className="right-content">
                    <h2>Join the Filo Waitlist</h2>
                    <div className='dots'>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                    <p>Please enter your name and email to join</p>

                    <form onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <IdIcon className='email-icon'/>
                            <input
                                type="name"
                                className="email-input"
                                placeholder="Full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-wrapper'>
                            <EmailIcon className='email-icon'/>
                            <input
                                type="email"
                                className="email-input"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            Join Waitlist
                        </button>
                    </form>

                    {error && <p className="error-message">{error}</p>}

                    <p className="support-text">
                    Have questions? Please contact <a href="mailto:ryan@filosolutions.co">ryan@filosolutions.co</a>
                    </p>
                </div>
            )}
            
        </div>
    </div>
  );
}

export default Waitlist;