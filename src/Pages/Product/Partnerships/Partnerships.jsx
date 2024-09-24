import React, {useEffect, useState, useRef} from 'react';
import './Partnerships.css';
import MyPartners from './MyPartners'
import Invites from './Invites'
import FindPartners from './FindPartners'
import '../../../Components/Product/Content/Content.css';

function Partnerships() {
    const [activeTab, setActiveTab] = useState('Find Partners');
    const sliderRef = useRef(null);
    const [pendingSent, setPendingSent] = useState([]);
    const [pendingReceived, setPendingReceived] = useState([]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        // Prevent body from scrolling when the component mounts
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        // Function to move the slider under the active tab
        const moveSlider = () => {
          const activeTabElement = document.querySelector('.header-tab.active');
          if (activeTabElement && sliderRef.current) {
            const { offsetLeft, offsetWidth } = activeTabElement;
            sliderRef.current.style.left = `${offsetLeft+10}px`;
            sliderRef.current.style.width = `${offsetWidth-20}px`;
          }
        };
        moveSlider();
        window.addEventListener('resize', moveSlider); // Reposition on window resize
        // Cleanup listener on component unmount
        return () => {
          window.removeEventListener('resize', moveSlider);
        };
    }, [activeTab]);

    return (
        <div className="content partnerships">
            <div className="content-header">
                <h1>Partners</h1>
                <div className="header-tabs">
                    <div className='header-slider' ref={sliderRef}/>
                    <button
                    className={'header-tab'+(activeTab === 'My Partners' ? ' active' : '')}
                    onClick={() => handleTabChange('My Partners')}>
                    My Partners
                    </button>
                    <button
                    className={'header-tab'+(activeTab === 'Invites' ? ' active' : '')}
                    onClick={() => handleTabChange('Invites')}>
                    Invites
                    </button>
                    <button
                    className={'header-tab'+(activeTab === 'Find Partners' ? ' active' : '')}
                    onClick={() => handleTabChange('Find Partners')}>
                    All Other
                    </button>
                </div>
            </div>
            {/* Render Content Based on Active Tab */}
            <div className="content-detail">
                {activeTab === 'My Partners' && <MyPartners setPendingSent={setPendingSent} setPendingReceived={setPendingReceived}/>}
                {activeTab === 'Invites' && <Invites pendingSent={pendingSent} pendingReceived={pendingReceived}/>}
                {activeTab === 'Find Partners' && <FindPartners />}
            </div>
        </div>
    );
};

export default Partnerships;