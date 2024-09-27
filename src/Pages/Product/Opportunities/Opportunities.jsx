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
            <TabularMenu headerName={"Opportunities"} tabItems={tabItems} activeTab={activeTab} setActiveTab={setActiveTab}/>
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
                            {leads.map(lead => (
                                <Row key={lead.id} leadData={lead}/>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Opportunities;