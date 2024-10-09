import React, {useState, useEffect, useContext} from 'react';
import { BusinessContext } from '../../../objects/UserContext/UserContext';
import './Opportunities.css';
import '../../../Components/Product/Content/Content.css';
import Row from '../../../Components/Product/Row/Row';
import TabularMenu from '../../../Components/Product/TabularMenu/TabularMenu';
import LoadingScreen from '../../../Components/Product/LoadingScreen/LoadingScreen';
import axios from 'axios';


function Opportunities() {
    const { business } = useContext(BusinessContext);
    const tabItems = ['All Referrals', 'Received', 'Shared'];
    const [activeTab, setActiveTab] = useState('All Referrals');
    const [trashOn, setTrashOn]= useState(false);
    const [selectAll, setSelectAll] = useState(false); // Header checkbox state
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [fetchedLeads, setFetchedLeads] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [leads, setLeads] = useState([]);



    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await axios.get((process.env.REACT_APP_API_BASE_URL)+'/api/businesses/get-leads/'+(business.id));
            const data = response.data;
            setLeads(data)
        } catch (err) {
            console.error('Error fetching leads:', err.response?.data || err.message);
            const errorMessage = err.response?.data?.error;
    
            if (errorMessage !== 'No leads found for this business.') {
                setError(errorMessage || 'An error occurred while fetching leads.');
            }
            console.log(err);
        } finally {
            console.log("FETCH LEADS COMPLETED.");
            setFetchedLeads(true);
            setLoading(false);
        }        
    };

    const deleteLead = async ({leadId, otherBusinessId}) => {
        removeLeadFromList({leadId: leadId})
        try {
            const response = await axios.post((process.env.REACT_APP_API_BASE_URL)+'/api/leads/delete-lead', {
                businessId: business.id,
                otherBusinessId: otherBusinessId,
                leadId: leadId,
            });
            console.log('Partnership updated successfully:', response.data);
        } catch (error) {
            console.error('Error deleting partnership:', error.response?.data || error.message);
        }
    };

    const updateLead = async ({leadId, otherBusinessId, newStatus}) => {
        updateLeadList({leadId: leadId, newStatus: newStatus})
        try {
            const response = await axios.post((process.env.REACT_APP_API_BASE_URL)+'/api/leads/update-lead', {
                businessId: business.id,
                otherBusinessId: otherBusinessId,
                leadId: leadId,
                status: newStatus,
            });
            console.log('Partnership updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating partnership:', error.response?.data || error.message);
        }
    };

    const updateLeadList = ({leadId, newStatus}) => {
        setLeads((prevLeads) => 
            prevLeads.map((lead) => 
                lead.id === leadId ? { ...lead, status: newStatus } : lead
            )
        );
    }

    const removeLeadFromList = ({ leadId }) => {
        setLeads((prevLeads) =>
          prevLeads.filter((lead) => lead.id !== leadId)
        );
    };

    const leadSelected = ({ lead }) => {
        setSelectedLeads((prevSelected) => {
            const updatedLeads = {
                ...prevSelected,
                [lead.id]: !prevSelected[lead.id],
            };
            setTrashOn(Object.values(updatedLeads).some((isSelected) => isSelected));
            console.log(updatedLeads);
            return updatedLeads;
        });
    };

    const allSelected = () => {
        setSelectAll(!selectAll);
        const newSelectedLeads = {};
        leads.forEach((lead) => {
            newSelectedLeads[lead.id] = !selectAll;
        });
        setSelectedLeads(newSelectedLeads);
        setTrashOn(Object.values(newSelectedLeads).some((isSelected) => isSelected));
    }

    const deleteSelectedLeads = async () => {
        // Iterate over selected leads and filter only those that are `true`
        for (let leadId in selectedLeads) {
            if (selectedLeads[leadId]) {
              const lead = getLeadById(leadId); // Get the lead data from the leads list
              if (lead) {
                const { id, otherBusinessId } = lead;
                console.log(id, otherBusinessId);
                try {
                  await deleteLead({ leadId: id, otherBusinessId });
                } catch (error) {
                  console.error('Error deleting lead:', error.response?.data || error.message);
                }
              } else {
                console.error(`Lead with id ${leadId} not found.`);
              }
            }
          }
        setSelectedLeads({});
        setTrashOn(false);
        setSelectAll(false);
    };

    const getLeadById = (leadId) => {
        return leads.find((lead) => lead.id === leadId); // Compare as strings since id is a string
    };      

    useEffect(() => {
        // Prevent body from scrolling when the component mounts
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (!fetchedLeads && !loading) {
            fetchLeads();
        }
    }, [activeTab]);

    return (
        <div className="content opportunities">
            <TabularMenu headerName={"Opportunities"} tabItems={tabItems} activeTab={activeTab} setActiveTab={setActiveTab} trashOn={trashOn} trashClicked={deleteSelectedLeads}/>
            <div className="content-detail">
            {loading ? (
                    <LoadingScreen isLoading={loading}/>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <table className="opportunities-table">
                        <thead>
                            <tr>
                            <th><input type="checkbox" checked={selectAll} onChange={() => allSelected()}/></th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Status</th>
                            <th>Partners</th>
                            <th>Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(activeTab === "All Referrals") ? (
                                leads.map(lead => (
                                    <Row key={lead.id} leadData={lead} updateLead={updateLead} leadSelected={leadSelected} checked={selectedLeads[lead.id]} />
                                ))
                            ) : (activeTab === "Received") ? (
                                leads
                                    .filter(lead => lead.direction === 'Received')
                                    .map(lead => (
                                        <Row key={lead.id} leadData={lead} updateLead={updateLead} leadSelected={leadSelected} checked={selectedLeads[lead.id]} />
                                    ))
                            ) : (
                                leads
                                    .filter(lead => lead.direction === 'Shared')
                                    .map(lead => (
                                        <Row key={lead.id} leadData={lead} updateLead={updateLead} leadSelected={leadSelected} checked={selectedLeads[lead.id]} />
                                    ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Opportunities;