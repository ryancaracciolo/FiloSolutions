import React, { useState, useEffect, useRef } from 'react';
import './Learn-More.css';
import DotGrid from '../../../Components/Landing/DotGrid/DotGrid';

const LearnMore = () => {
    const [activeSection, setActiveSection] = useState(0);

  const sectionRefs = [useRef(null), useRef(null), useRef(null)]; // Adjust the number based on sections

  const handleScroll = () => {
    sectionRefs.forEach((ref, index) => {
      const sectionTop = ref.current.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight / 2; // Halfway point of the viewport
      if (sectionTop < triggerPoint) {
        setActiveSection(index + 1); // Update the active section based on scroll
        console.log(activeSection);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="how-it-works">
        <h1 className='header'>How It Works</h1>
        <div className="content-sections">
            <div className='section'>
                <div className="text-content" ref={sectionRefs[0]}>
                    <h2>STEP 1</h2>
                    <h3>Find Partnerships</h3>
                    <p>It’s like LinkedIn for partnerships. Members can find and connect with the companies in their partner ecosystem in just a few clicks.</p>
                    <DotGrid />
                </div>
                <div className={`circle ${activeSection >= 1 ? 'active' : ''}`}>1</div>
                <div className="image-content">
                    <img src="your-image-url-here" alt="How It Works" />
                </div>
            </div>
            <div className='section'>
                <div className="image-content">
                    <img src="your-image-url-here" alt="How It Works" />
                </div>
                <div className={`circle ${activeSection >= 2 ? 'active' : ''}`}>2</div>
                <div className="text-content" ref={sectionRefs[1]}>
                    <h2>STEP 2</h2>
                    <h3>Send and Receive Referrals</h3>
                    <p>Make the most of networking. Members can send and receive promising business opportunities with ease. 
                        Strengthen business connections and turn them into valuable partnerships.</p>
                    <DotGrid />
                </div>
            </div>
            <div className='section'>
                <div className="text-content" ref={sectionRefs[2]}>
                    <h2>STEP 3</h2>
                    <h3>Track Opportunities</h3>
                    <p>Track opportunities effortlessly. Members stay on top of every business lead and referral, 
                        ensuring no opportunity slips through the cracks and partnerships are beneficial.</p>
                    <DotGrid />
                </div>
                <div className={`circle ${activeSection >= 3 ? 'active' : ''}`}>3</div>
                <div className="image-content">
                    <img src="your-image-url-here" alt="How It Works" />
                </div>
            </div>
            {/* Middle Column - Line and Circles */}
            <div className="line">
            </div>
        </div>
    </div>
  );
};

export default LearnMore;
