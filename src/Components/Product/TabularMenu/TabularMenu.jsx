import React, { useEffect, useRef } from 'react';
import './TabularMenu.css';

const TabularMenu = ({ headerName, tabItems, activeTab, setActiveTab }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    // Function to move the slider under the active tab
    const moveSlider = () => {
      const activeTabElement = document.querySelector('.header-tab.active');
      if (activeTabElement && sliderRef.current) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        sliderRef.current.style.left = `${offsetLeft+offsetWidth/2-35}px`;
        sliderRef.current.style.width = `70px`;
      }
    };
    moveSlider();
    window.addEventListener('resize', moveSlider);
    return () => {
      window.removeEventListener('resize', moveSlider);
    };
  }, [activeTab]);

  return (
    <div className="content-header">
      <h1>{headerName}</h1>
      <div className="header-tabs">
        <div className="header-slider" ref={sliderRef} />
        {tabItems.map((tab) => (
          <button
            key={tab} // Ensure tab names are unique; otherwise, use tab.id if available
            className={`header-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabularMenu;
