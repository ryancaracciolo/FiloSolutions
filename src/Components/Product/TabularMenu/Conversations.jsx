import React, { useEffect, useState } from 'react';
import './Conversations.css';
import {ReactComponent as NewChat} from '../../../Assets/Icons/chat-icon.svg'
import { useNavigate } from 'react-router-dom';

const Conversations = ({ activeTab, setActiveTab, conversations, startNewChat }) => {
  const [individuals, setIndividuals] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const getConversations = () => {
    const individualConvs = conversations?.filter((c) => c.participants.length === 1);
    const groupConvs = conversations?.filter((c) => c.participants.length > 1);

    setIndividuals(individualConvs);
    setGroups(groupConvs);
    setLoading(false);
  };

  useEffect(() => {
    getConversations();
  }, [conversations]);

  return (
    <div className='conversation-container'>
        <div className='new-thread' onClick={startNewChat}>
            <NewChat className='chat-icon'/>
            <h2>New Thread</h2>
        </div>
        <div className='convo-group'>
            <h2>Individuals</h2>
            <div className='conversations'>
            {loading ? (
                // Show loading placeholders for individuals
                Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='menu-tab placeholder'>
                    <div className='loading-bubble'></div>
                </div>
                ))
            ) : (
                individuals.map((c) => (
                <button
                    key={c.SK}
                    className={`menu-tab${activeTab === c.SK ? ' active' : ''}`}
                    onClick={() => setActiveTab(c.SK)}
                >
                    <p>{c.participants[0]}</p>
                    <div className='line'></div>
                    <div className='dash'></div>
                </button>
                ))
            )}
            </div>
        </div>
        <div className='convo-group'>
            <h2>Groups</h2>
            <div className='conversations'>
                {loading ? (
                // Show loading placeholders for groups
                Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className='menu-tab placeholder'>
                    <div className='loading-bubble'></div>
                    </div>
                ))
                ) : (
                groups.map((c) => (
                    <button
                    key={c.SK}
                    className={`menu-tab${activeTab === c.SK ? ' active' : ''}`}
                    onClick={() => setActiveTab(c.SK)}
                    >
                    <p>{c.name}</p>
                    <div className='line'></div>
                    <div className='dash'></div>
                    </button>
                ))
                )}
            </div>
        </div>
    </div>
  );
};

export default Conversations;