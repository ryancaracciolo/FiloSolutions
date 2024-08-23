import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../Assets/Images/hero-image.png'; // Ensure paths are correct
import filoLogo from '../../Assets/Images/Filo-Logo-noText.png'; // Ensure paths are correct
import './Home.css'; // Assuming you have a corresponding CSS file

const Home = () => {
    return (
        <div>
            <section className="hero-home">
                <div className="container">
                    <div className="hero-content">
                        <h2>Empowering Chambers to Drive Member Success</h2>
                        <div className="dot-separator">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <p>
                            Boost engagement and deliver exceptional value to your members with a platform
                            that makes strategic partnerships and collaboration effortless.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn">Contact</Link>
                            <Link to="/learn-more" className="btn btn-secondary">Learn More</Link>
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Hero" />
                </div>
            </section>

            <section id="why-chambers">
                <div className="section-title">
                    <div className="Filo-logo">
                        <img src={filoLogo} alt="Filo Logo" />
                    </div>
                    <h3>Why Chambers Use Filo</h3>
                </div>
                <div className="reasons">
                    <div className="reason">
                        <h4>Improve Member Engagement</h4>
                        <p>
                            Enhance the value of Chamber membership by providing tangible value to business
                            members, leading to strong retention & satisfaction.
                        </p>
                    </div>
                    <div className="reason">
                        <h4>Drive Collaborative Growth</h4>
                        <p>
                            Facilitate strategic partnerships within your Chamber that enable businesses to
                            collaborate, innovate, and grow together.
                        </p>
                    </div>
                    <div className="reason">
                        <h4>Grow Membership Base</h4>
                        <p>
                            Attract new, young business members to your Chamber with technology that drives
                            collaborative growth and business success.
                        </p>
                    </div>
                </div>
            </section>

            <section id="benefits">
                <div className="benefits-layout">
                    <div className="benefits-title">
                        <h3>Benefits to your<br />Business Members</h3>
                    </div>
                    <div className="benefits-list">
                        <div className="benefit">
                            <div className="benefit-number" id="one">
                                <div><span>1</span></div>
                            </div>
                            <div className="benefit-content">
                                <h4 id="benefit-one">Revenue Growth</h4>
                                <p>Accelerate revenue growth through increased leads & more business.</p>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="benefit-number" id="two">
                                <div><span>2</span></div>
                            </div>
                            <div className="benefit-content">
                                <h4 id="benefit-two">Strategic Partnerships</h4>
                                <p>
                                    Collaborate & network with other Chamber members, developing strategic
                                    partnerships through the platform to drive growth.
                                </p>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="benefit-number" id="three">
                                <div><span>3</span></div>
                            </div>
                            <div className="benefit-content">
                                <h4 id="benefit-three">Strategic Partnerships</h4>
                                <p>
                                    Collaborate & network with other Chamber members, developing strategic
                                    partnerships through the platform to drive growth.
                                </p>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="benefit-number" id="four">
                                <div><span>4</span></div>
                            </div>
                            <div className="benefit-content">
                                <h4 id="benefit-four">Revenue Growth</h4>
                                <p>Accelerate revenue growth through increased leads & more business.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;