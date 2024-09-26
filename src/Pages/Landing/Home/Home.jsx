import React from 'react';
import heroImage from '../../../Assets/Images/hero-image.png';
import productImage from '../../../Assets/Images/product-overview.png';
import filoLogo from '../../../Assets/Images/Filo-Logo-noText.png';
import { ReactComponent as EngageIcon } from '../../../Assets/Icons/engage-icon.svg';
import { ReactComponent as CommunityIcon } from '../../../Assets/Icons/circles-icon.svg';
import { ReactComponent as GrowthIcon } from '../../../Assets/Icons/graph-icon.svg';
import Divider from '../../../Components/Landing/Divider/Divider'

import './Home.css';

const Home = () => {
    return (
        <div>
            <section className="hero-home">
                <div className="container">
                    <div className="hero-content">
                        <h1>CHAMBER OF COMMERCE</h1>
                        <h2>Turn Your Member Base <br/>Into a Community</h2>
                        <p>
                            Boost engagement and deliver exceptional value to your members with a platform
                            that makes strategic partnerships and collaboration effortless.
                        </p>
                        <div className="cta-buttons">
                            <a className="btn btn-secondary" href="#contact">Contact</a>
                        </div>
                    </div>
                    <div className="product-image">
                        <img src={productImage} alt="Product" />
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
                    <h3>Why Chambers Choose Filo</h3>
                </div>
                <div className="reasons">
                    <div className="reason">
                        <EngageIcon className='reason-icon'/>
                        <h4>Engagement</h4>
                        <h5>Improve Member Engagement</h5>
                        <p>
                            Filo helps maximize the impact of networking by facilitating partnerships, 
                            streamlining referrals, and turning connections into valuable opportunities.
                        </p>
                    </div>
                    <div className="reason">
                        <CommunityIcon className='reason-icon'/>
                        <h4>Community</h4>
                        <h5>Build a Collaborative Community</h5>
                        <p>
                            Filo fosters community by encouraging collaboration and partnerships among members, 
                            helping businesses support one another and grow together.
                        </p>
                    </div>
                    <div className="reason">
                        <GrowthIcon className='reason-icon'/>
                        <h4>Growth</h4>
                        <h5>Retain and Grow Membership</h5>
                        <p>
                            Attract younger business owners with modern technology that tracks 
                            and showcases the tangible value created through Chamber networking.
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
                                <h4 id="benefit-one">Create Strategic Partnerships</h4>
                                <p>Easily connect with other local businesses that complement your goals and grow through meaningful collaboration.</p>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="benefit-number" id="two">
                                <div><span>2</span></div>
                            </div>
                            <div className="benefit-content">
                                <h4 id="benefit-two">Grow Revenue</h4>
                                <p>
                                    Unlock new opportunities and drive growth by leveraging a network of trusted partners and referrals.
                                </p>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="benefit-number" id="three">
                                <div><span>3</span></div>
                            </div>
                            <div className="benefit-content">
                                <h4 id="benefit-three">Track Outcomes </h4>
                                <p>
                                    Measure the effectiveness of each partnership, ensuring mutual benefit and fostering stronger business relationships.
                                </p>
                            </div>
                        </div>
                        <div className="benefit">
                            <div className="benefit-number" id="four">
                                <div><span>4</span></div>
                            </div>
                            <div className="benefit-content">
                                <h4 id="benefit-four">Streamline Collaboration</h4>
                                <p>Simplify communication and referral processes, saving time and making business connections more efficient.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Divider color='white' />
        </div>
    );
};

export default Home;