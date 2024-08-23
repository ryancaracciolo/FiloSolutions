import React from 'react';
import './Contact.css';
import contactImage from '../../Assets//Images/background.png';

const Contact = () => {
    return (
        <div className="contact-section">
            <div className="contact-content">
                <div className="contact-info">
                    <h2>We'd Love to Hear from You</h2>
                    <p>Get in touch with our team to learn more about how Filo can support you.</p>
                </div>
                <form className="contact-form">
                    <input type="text" id="name" name="name" placeholder="Name" required /><br />
                    <input type="email" id="email" name="email" placeholder="Email" required /><br />
                    <textarea id="message" name="message" placeholder="What can we help you with?" rows="5" required></textarea><br />
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
            <div className="contact-image">
                <img src={contactImage} alt="Contact Background" />
            </div>
        </div>
    );
};

export default Contact;
