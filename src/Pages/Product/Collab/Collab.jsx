import React, { useState, useEffect, useRef, useContext } from 'react'; 
import { BusinessContext } from '../../../objects/UserContext/UserContext';
import './Collab.css';
import '../../../Components/Product/Content/Content.css';
import TabularMenu from '../../../Components/Product/TabularMenu/TabularMenu';
import LoadingScreen from '../../../Components/Product/LoadingScreen/LoadingScreen';

function Collab() {
    const { business } = useContext(BusinessContext);
    
    const [tabItems] = useState(['Messages', 'Groups']);
    const [conversations, setConversations] = useState([]);
    const [activeTab, setActiveTab] = useState('Messages');
    const [isNewChat, setIsNewChat] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Mock businesses for demonstration; replace with API call in production
    const mockBusinesses = [
        { id: 'Business#1111x', name: 'Business One' },
        { id: 'Business#2222x', name: 'Business Two' },
        { id: 'Business#3333x', name: 'Business Three' },
        { id: 'Business#5555x', name: 'Business Five' },
    ];

    useEffect(() => {
        // Initial load of conversations
        const conv = [
            {
              PK: 'BUSINESS#12345',
              SK: 'CONVERSATION#67890',
              participants: ['Business#1111'],
              name: 'Business One',
            },
            {
              PK: 'BUSINESS#12345',
              SK: 'CONVERSATION#12345',
              participants: ['Business#2222', 'Business#3333'],
              name: 'Home Services Squad',
            },
            {
              PK: 'BUSINESS#12345',
              SK: 'CONVERSATION#678902',
              participants: ['Business#5555'],
              name: 'Business Five',
            },
            {
              PK: 'BUSINESS#12345',
              SK: 'CONVERSATION#123452',
              participants: ['Business#2222', 'Business#3333'],
              name: 'The Cool Kids',
            },
          ];
        setConversations(conv);
    }, []);

    useEffect(() => {
        // Perform search when searchTerm changes
        if (searchTerm.trim() === '') {
            setSearchResults([]);
        } else {
            const results = mockBusinesses.filter((business) =>
                business.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        }
    }, [searchTerm]);

    useEffect(() => {
        // Scroll to the bottom when messages change
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const newMsg = {
                id: messages.length + 1,
                text: newMessage,
                sender: business.id, // Current business ID
                profilePic: 'https://via.placeholder.com/40',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    const handleSendReferral = () => {
        console.log('Referral');
    };

    const handleSelectBusiness = (business) => {
        setSearchTerm('');
        setSearchResults([]);
        setIsNewChat(false); // Exit new chat mode

        // Check if the conversation already exists
        const existingConvo = conversations.find(convo => 
            convo.participants.includes(business.id)
        );

        if (!existingConvo) {
            // Create a new conversation object
            const newConvo = {
                PK: `BUSINESS#${business.id}`,
                SK: `CONVERSATION#${Date.now()}`, // Unique identifier
                participants: [business.id],
                name: business.name,
            };
            // Update conversations
            setConversations([...conversations, newConvo]);
            // Set active tab to the new conversation's SK
            setActiveTab(newConvo.SK);
        } else {
            // Set active tab to existing conversation's SK
            setActiveTab(existingConvo.SK);
        }
        setSelectedBusiness(business);
    };

    const handleTabChange = (tab) => {
        if (tab === 'New Thread') {
            startNewChat();
        } else {
            setActiveTab(tab);
            setIsNewChat(false); // Exit new chat mode

            // If the tab is a conversation SK, load the corresponding messages
            const selectedConvo = conversations.find(convo => convo.SK === tab);
            if (selectedConvo) {
                // Load messages for this conversation
                // Assuming one-on-one conversations for simplicity
                const participantId = selectedConvo.participants.find(id => id !== business.id) || business.id;
                const participantBusiness = mockBusinesses.find(b => b.id === participantId);
                setSelectedBusiness({
                    id: participantId,
                    name: selectedConvo.name || participantBusiness?.name || `Conversation with ${selectedConvo.participants.join(', ')}`,
                });
                // Fetch messages from API or set mock messages
                setMessages([
                    // Mock messages
                ]);
            } else {
                // Handle other tabs like 'Messages' or 'Groups'
                setSelectedBusiness(null);
                setMessages([]);
            }
        }
    };

    const startNewChat = () => {
        setIsNewChat(true);
        setSearchTerm('');
        setSearchResults([]);
        setSelectedBusiness(null);
        setActiveTab('To:');
        setMessages([]);
    };

    return (
        <div className="content opportunities">
            <TabularMenu
                headerName={"Collaboration"}
                tabItems={tabItems}
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                isCollab={true}
                conversations={conversations}
                startNewChat={startNewChat} // Pass the function to TabularMenu
            />
            <div className="content-detail">
                {loading ? (
                    <LoadingScreen isLoading={loading} />
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <>
                        <div className="detail-header">
                            {(!selectedBusiness || activeTab === 'To:') ? (
                                <input
                                    className="chat-title"
                                    type="text"
                                    placeholder="To:"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            ) : (
                                <h2 className='chat-title'>{selectedBusiness.name}</h2>
                            )}
                        </div>
                        {((isNewChat || activeTab === 'To:' || searchTerm) && searchResults.length > 0) && (
                            <div className="business-search-popup">
                                <ul>
                                    {searchResults.map((business) => (
                                        <li
                                            key={business.id}
                                            onClick={() => handleSelectBusiness(business)}
                                        >
                                            {business.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="chat-container">
                            <div className="messages-list">
                                {messages.map((message, index) => {
                                    const isSameSenderAsPrev =
                                        index > 0 && messages[index - 1].sender === message.sender;
                                    return (
                                        <div
                                            key={message.id}
                                            className={`message-bubble ${
                                                message.sender === business.id ? 'sent' : 'received'
                                            } ${isSameSenderAsPrev ? 'margin-adjust' : ''}`}
                                        >
                                            <img
                                                className="profile-pic"
                                                src={message.profilePic}
                                                alt={`${message.sender}'s profile`}
                                            />
                                            <div className="message-content">
                                                <p>{message.text}</p>
                                                <span className="timestamp">{message.timestamp}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="message-input">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') handleSendMessage();
                                    }}
                                />
                                <button onClick={handleSendMessage}>Send</button>
                                <button className="referral-button" onClick={handleSendReferral}>
                                    +
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Collab;
