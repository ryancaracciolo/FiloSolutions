import React, {useEffect, useState, useContext, useRef } from 'react';
import { BusinessContext, SearchContext } from '../../../objects/UserContext/UserContext';
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const isInitialMount = useRef(true); // This keeps track of the first render

    // My Partners
    const [partners, setPartners] = useState([]);
    const [suggPartners, setSuggPartners] = useState([]);
    const [fetchedPartners, setFetchedPartners] = useState(false);
    // Invites
    const [pendingSent, setPendingSent] = useState([]);
    const [pendingReceived, setPendingReceived] = useState([]);
    // Find Partners
    const [otherBusinesses, setOtherBusinesses] = useState([]);
    const [fetchedOther, setFetchedOther] = useState(false);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
    const {searchText, setSearchText} = useContext(SearchContext);


    const fetchPartners = async () => {
        setLoading(true);
        try {
            const response = await axios.get((process.env.REACT_APP_API_BASE_URL)+`/api/businesses/get-partners/${business.id}`);
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

    const fetchOther = async (reset = false) => {
        setLoading(true);
        try {
            const params = {
              lastEvaluatedKey: reset ? null : lastEvaluatedKey,
            };
      
            if (searchText.trim() !== '') {
              params.search = searchText;
            }
      
            const response = await axios.get((process.env.REACT_APP_API_BASE_URL)+'/api/businesses/search', { params });
            const list = updateBusinessStatus(response.data.items);
            if (reset) {
              // If reset is true, we replace the businesses list
              setOtherBusinesses(list);
            } else {
              // Append new items to the existing list
              setOtherBusinesses((prev) => [...prev, ...list]);
            }
      
            setLastEvaluatedKey(response.data.lastEvaluatedKey);
        } catch (error) {
            console.error('Error fetching businesses:', error);
        } finally {
            setLoading(false);
            setFetchedOther(true);
        } 
    };

    const updatePartner = async ({partnerId, newStatus, oldStatus}) => {
        moveItem(partnerId, newStatus, oldStatus);

        if (oldStatus === "Suggested") {
            try {
                const response = await axios.post((process.env.REACT_APP_API_BASE_URL)+'/api/partnerships/update-partnership', {
                    businessId1: business.id,
                    businessId2: partnerId,
                    status: newStatus,
                });
                console.log('Partnership updated successfully:', response.data);
            } catch (error) {
                console.error('Error updating partnership:', error.response?.data || error.message);
            }
        }

        else if (oldStatus === "Other") {
            try {
                const response = await axios.post((process.env.REACT_APP_API_BASE_URL)+'/api/partnerships/create-partnership', {
                    businessId1: business.id,
                    businessId2: partnerId,
                    status: newStatus,
                });
                console.log('Partnership created successfully:', response.data);
            } catch (error) {
                console.error('Error creating partnership:', error.response?.data || error.message);
            }
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
        console.log(key);

        if (config) {
            const { sourceList, setSource, setTarget } = config;
            const itemToMove = sourceList.find((item) => item.id === id);
            if (itemToMove) {
                setTarget((prevTargetList) => [...prevTargetList, itemToMove]);
                if (key !== 'Pending_Sent-Other') {
                    const updatedSourceList = sourceList.filter((item) => item.id !== id);
                    setSource(updatedSourceList);
                } else {
                    setSource(updateBusinessStatus(otherBusinesses));
                }
            }
        }
    }; 

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        setLastEvaluatedKey(null); // Reset pagination when search term changes
    };

    const updateBusinessStatus = (businesses) => {
        return businesses
        .filter((bus) => bus.id !== business.id) // Remove any business that has the same id as businessId
        .map((business) => {
          // Check each list in order of priority and assign the respective status
          if (partners.some((partner) => partner.id === business.id)) {
            return { ...business, status: 'Confirmed' }; // Business found in confirmedPartners
          } else if (pendingSent.some((partner) => partner.id === business.id)) {
            return { ...business, status: 'Pending_Sent' }; // Business found in pendingSentPartners
          } else if (pendingReceived.some((partner) => partner.id === business.id)) {
            return { ...business, status: 'Pending_Received' }; // Business found in pendingReceivedPartners
          } else if (suggPartners.some((partner) => partner.id === business.id)) {
            return { ...business, status: 'Suggested' }; // Business found in suggPartners
          }
          // If the business is not in any of the lists, return it as Other
          return  { ...business, status: 'Other' };
        });
    };
      

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (!fetchedPartners && !loading) {
            fetchPartners();
        }

        if (activeTab === 'Find Partners') {
            if (!fetchedOther && !loading) {
                fetchOther();
            }
        }
    }, [activeTab]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (activeTab === 'Find Partners') {
            fetchOther(true);   
        }
      }, [searchText]);

      useEffect(() => {
        setOtherBusinesses(updateBusinessStatus(otherBusinesses));
    }, [pendingSent, pendingReceived, partners, suggPartners]);

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
                        {activeTab === 'Find Partners' && (
                            <FindPartners suggPartners={suggPartners} otherBusinesses={otherBusinesses} updatePartner={updatePartner}/>
                        )}
                    </>
                )}
            </div>

        </div>
    );
};

export default Partnerships;