import React, { useState, useEffect } from 'react';
import './Demo.css';
import filoLogo from '../../../Assets/Images/FiloLogo.png';
import background from '../../../Assets/Images/background.png';
import { ReactComponent as EmailIcon } from '../../../Assets/Icons/email-icon.svg';
import { ReactComponent as IdIcon } from '../../../Assets/Icons/id-icon.svg';
import LoadingScreen from '../../../Components/Product/LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Demo() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [joinedDemo, setJoinedDemo] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  }, []);
  
  if (loading) {
    console.log('Loading...');
    return <LoadingScreen isLoading={loading}/>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJoinedDemo(true);
    try {
        const response = await axios.post(process.env.REACT_APP_API_BASE_URL+'/api/demo/add-user', {
        fullName,
        email,
      });
      
      if (response.status === 201) {
        setMessage('Thank you for joining the Demo!');
        setFullName('');  // Clear the form after successful submission
        setEmail('');
      } else {
        setMessage('An unexpected issue occurred, please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('You are already on the Demo!');
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
                <h1>Request Demo of Filo</h1>
                <p>
                Filo is partnering with select Chambers of Commerce to bring a powerful 
                collaboration platform to local businesses.
                </p>
                <hr />
                <p className='sub-p'>
                  By requesting a demo, you’ll have the opportunity to see firsthand how Filo 
                  can streamline business referrals, partnerships, and growth opportunities 
                  within your community.
                </p>
                <img src={background} alt="Filo Logo" className="login-background" />
            </div>
        </div>

        <div className="right-side">
            {joinedDemo ? (
                <div className="right-content">
                    <h2>Thanks for requesting a demo!</h2>
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
                    <h2>Request demo of the Filo platform</h2>
                    <div className='dots'>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                    <p>Please enter your name and email</p>

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
                            Request Demo
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

export default Demo;