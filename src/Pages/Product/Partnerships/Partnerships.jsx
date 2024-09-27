import React, {useEffect, useState, useContext } from 'react';
import { BusinessContext } from '../../../objects/UserContext/UserContext';
import './Partnerships.css';
import MyPartners from './MyPartners'
import Invites from './Invites'
import FindPartners from './FindPartners'
import TabularMenu from '../../../Components/Product/TabularMenu/TabularMenu';
import '../../../Components/Product/Content/Content.css';
import LoadingScreen from '../../../Components/Product/LoadingScreen/LoadingScreen';
import axios from 'axios';

function Partnerships() {    
    const { business } = useContext(BusinessContext);
    const tabItems = ['My Partners', 'Invites', 'Find Partners'];
    const [activeTab, setActiveTab] = useState('My Partners');
    const [fetchedPartners, setFetchedPartners] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); 
    // My Partners Lists
    const [partners, setPartners] = useState([]);
    const [suggPartners, setSuggPartners] = useState([]);
    // Invites Lists
    const [pendingSent, setPendingSent] = useState([]);
    const [pendingReceived, setPendingReceived] = useState([]);
    // Other List
    const [otherBusinesses, setOtherBusinesses] = useState([]);

    const fetchPartners = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/api/businesses/get-partners/${business.id}`);
            const data = response.data;
            setPendingSent(data["Pending_Sent"])
            setPendingReceived(data["Pending_Received"])
            setPartners(data["Confirmed"]);
            setSuggPartners(data["Suggested"]);
        } catch (err) {
            console.error('Error fetching partners:', err.response?.data || err.message);
            const errorMessage = err.response?.data?.error;
    
            if (errorMessage !== 'No partners found for this business.') {
                setError(errorMessage || 'An error occurred while fetching partners.');
            }
            console.log(err);
        } finally {
            console.log("FETCH PARTNERS COMPLETED.");
            setFetchedPartners(true);
            setLoading(false);
        }        
    };

    const updatePartner = async ({partnerId, newStatus, oldStatus}) => {
        moveItem(partnerId, newStatus, oldStatus);
        try {
            const response = await axios.post('http://localhost:3001/api/partnerships/update-partnership', {
                businessId1: business.id,
                businessId2: partnerId,
                status: newStatus,
            });
            console.log('Partnership updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating partnership:', error.response?.data || error.message);
        }
    };

    const moveItem = (id, newStatus, oldStatus) => {
        const statusMap = {
            'Confirmed-Pending_Received': {sourceList: pendingReceived, setSource: setPendingReceived, setTarget: setPartners,},
            'Pending_Sent-Suggested': {sourceList: suggPartners, setSource: setSuggPartners, setTarget: setPendingSent,},
            'Other-Confirmed': {sourceList: partners, setSource: setPartners, setTarget: setOtherBusinesses,},
            'Other-Pending_Sent': {sourceList: pendingSent, setSource: setPendingSent, setTarget: setOtherBusinesses,},
            'Pending_Sent-Other': {sourceList: otherBusinesses, setSource: setOtherBusinesses, setTarget: setPendingSent,},
        };

        const key = `${newStatus}-${oldStatus}`;
        const config = statusMap[key];

        if (config) {
            const { sourceList, setSource, setTarget } = config;
            const itemToMove = sourceList.find((item) => item.id === id);
            if (itemToMove) {
                const updatedSourceList = sourceList.filter((item) => item.id !== id);
                setSource(updatedSourceList);
                setTarget((prevTargetList) => [...prevTargetList, itemToMove]);
            }
        }
    }; 

    useEffect(() => {
        // Prevent body from scrolling when the component mounts
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (!fetchedPartners && !loading) {
            fetchPartners();
        }
    }, [activeTab]);

    return (
        <div className="content partnerships">
            <TabularMenu headerName={"Partners"} tabItems={tabItems} activeTab={activeTab} setActiveTab={setActiveTab}/>
            {/* Render Content Based on Active Tab */}
            <div className="content-detail">
                {loading ? (
                    <LoadingScreen isLoading={loading}/>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <>
                        {activeTab === 'My Partners' && (
                        <MyPartners partners={partners} suggPartners={suggPartners} updatePartner={updatePartner} />
                        )}
                        {activeTab === 'Invites' && (
                        <Invites pendingSent={pendingSent} pendingReceived={pendingReceived} updatePartner={updatePartner} />
                        )}
                        {activeTab === 'Find Partners' && <FindPartners />}
                    </>
                )}
            </div>

        </div>
    );
};

export default Partnerships;