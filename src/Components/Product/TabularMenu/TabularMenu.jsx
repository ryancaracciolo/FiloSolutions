import React, { useEffect, useRef } from 'react';
import './TabularMenu.css';
import {ReactComponent as DeleteIcon} from '../../../Assets/Icons/delete-icon.svg'


const TabularMenu = ({ headerName, tabItems, activeTab, setActiveTab, trashOn, trashClicked }) => {

  return (
    <div className="content-header">
      <h1>{headerName}</h1>
      <div className="header-tabs">
        {tabItems.map((tab) => (
          <button
            key={tab} // Ensure tab names are unique; otherwise, use tab.id if available
            className={`header-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <p>{tab}</p>
          </button>
        ))}
      </div>
      {(headerName === "Opportunities") ? (
        <div onClick={trashOn ? trashClicked : null} className={'delete-lead'+(trashOn ? ' active' : '')}>
          <DeleteIcon onClick={trashClicked} className={'delete-icon'+(trashOn ? ' active' : '')} />
          <span className={(trashOn ? ' active' : '')}>Delete</span>
        </div>
        ) : null}
    </div>
  );
};

export default TabularMenu;
