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
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [fetchedLeads, setFetchedLeads] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [leads, setLeads] = useState([]);



    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/api/businesses/get-leads/${business.id}`);
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
            const response = await axios.post('http://localhost:3001/api/leads/delete-lead', {
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
            const response = await axios.post('http://localhost:3001/api/leads/update-lead', {
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
        setSelectedLeads(prevSelectedLeads => {
            let updatedLeads;
            // Check if the lead is already in selectedLeads by comparing lead.id
            if (prevSelectedLeads.some(selectedLead => selectedLead.id === lead.id)) {
                // If it's already selected, remove it by filtering out the lead with the same id
                updatedLeads = prevSelectedLeads.filter(selectedLead => selectedLead.id !== lead.id);
            } else {
                // If it's not selected, add the full lead object
                updatedLeads = [...prevSelectedLeads, lead];
            }
            setTrashOn(updatedLeads.length > 0);
            console.log(updatedLeads);
            return updatedLeads;
        });
    };
    

    const deleteSelectedLeads = async () => {
        for (let lead of selectedLeads) {
            const { id, otherBusinessId } = lead; // Assuming lead has these properties  
            console.log(id, otherBusinessId);          
            try {
                await deleteLead({ leadId: id, otherBusinessId: otherBusinessId });
            } catch (error) {
                console.error('Error deleting lead:', error.response?.data || error.message);
            }
        }
    
        setSelectedLeads([]);
        setTrashOn(false);
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
                            <th><input type="checkbox" /></th>
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
                                    <Row key={lead.id} leadData={lead} updateLead={updateLead} leadSelected={leadSelected} />
                                ))
                            ) : (activeTab === "Received") ? (
                                leads
                                    .filter(lead => lead.direction === 'Received')
                                    .map(lead => (
                                        <Row key={lead.id} leadData={lead} updateLead={updateLead} leadSelected={leadSelected} />
                                    ))
                            ) : (
                                leads
                                    .filter(lead => lead.direction === 'Shared')
                                    .map(lead => (
                                        <Row key={lead.id} leadData={lead} updateLead={updateLead} leadSelected={leadSelected} />
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