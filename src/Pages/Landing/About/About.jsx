import React from 'react';
import './About.css';
import visionImg from '../../../Assets/Images/Collab_Illust.svg';
import ryanImg from '../../../Assets/Images/ryan-caracciolo.jfif';
import evanImg from '../../../Assets/Images/evan-caracciolo.jfif';


const About = () => {
    return (
        <div className='about-wrapper'>
            <div className='about-item'>
                <div className= 'content'>
                    <h2>Our Vision</h2>
                    <p>Our vision is to create a thriving network of businesses that <span>collaborate</span>, <span>grow</span>, and <span>succeed</span> together.</p>
                    <p>By empowering Chambers of Commerce with innovative tools and resources, we aim to foster an environment where every member can maximize their potential and contribute to a healthy business ecosystem.</p>
                </div>
                <div className='image'>
                    <img src={visionImg} alt='about-image'></img>
                </div>
            </div>
            <div className='about-item' id='core-values'>
                <div className='content'>
                    <h2>Core Values</h2>
                    <p>At Filo, our core values are the guiding principles that shape our decisions and 
                        actions. They reflect our commitment to creating a platform that not only helps 
                        businesses succeed but also strengthens the communities they serve. These values 
                        are the cornerstone of our mission and are embedded in every aspect of our work.</p>
                </div>
                <div className="benefits-list">
                    <div className="benefit">
                        <div className="benefit-number" id="one">
                            <div><span>1</span></div>
                        </div>
                        <div className="benefit-content">
                            <h4 id="benefit-one">Collaboration</h4>
                            <p>At Filo, we believe that the best ideas and solutions come from working together. Our platform is built on the principle of collaboration, ensuring that every business within a Chamber of Commerce can benefit from the collective wisdom and support of their peers.</p>
                        </div>
                    </div>
                    <div className="benefit">
                        <div className="benefit-number" id="two">
                            <div><span>2</span></div>
                        </div>
                        <div className="benefit-content">
                            <h4 id="benefit-two">Integrity</h4>
                            <p>
                            Trust is the foundation of any successful partnership, and at Filo, we uphold the highest standards of integrity in everything we do. We are committed to being transparent, honest, and ethical, both in our business practices and in our relationships.
                            </p>
                        </div>
                    </div>
                    <div className="benefit">
                        <div className="benefit-number" id="three">
                            <div><span>3</span></div>
                        </div>
                        <div className="benefit-content">
                            <h4 id="benefit-three">Security</h4>
                            <p>
                            Security is at the heart of everything we do at Filo. We understand that the trust our users place in us depends on our ability to protect their data and ensure their business operations are secure. Our commitment to security means that you can focus on growing your business with confidence, knowing that your data is in safe hands.                                </p>
                        </div>
                    </div>
                    <div className="benefit">
                        <div className="benefit-number" id="four">
                            <div><span>4</span></div>
                        </div>
                        <div className="benefit-content">
                            <h4 id="benefit-four">Community</h4>
                            <p>Filo is more than just a business—it's a community. We understand that the strength of local businesses is directly tied to the strength of their communities. That’s why we are dedicated to helping Chambers of Commerce create thriving, interconnected networks where businesses can grow and support one another.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='about-item'>
                <div className= 'content'>
                    <h2>The Filo Team</h2>
                    <p>Our team may be small, but we're always here to support you—dedicated to helping your business thrive every step of the way.</p>
                </div>
                <div className='team'>
                    <div className='team-member'>
                        <img src={ryanImg} alt='team'></img>
                        <h3 className='name'>Ryan Caracciolo</h3>
                        <p>(207) 890-6680<br></br>caracciolo.ryan@gmail.com</p>
                    </div>
                    <div className='team-member'>
                        <img src={evanImg} alt='team'></img>
                        <h3 className='name'>Evan Caracciolo</h3>
                        <p>(207) 890-4031<br></br>caracciolo.evan@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
