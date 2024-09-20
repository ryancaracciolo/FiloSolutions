import React, {useEffect, useState, useContext} from 'react';
import { BusinessContext } from '../../../objects/UserContext/UserContext';
import './Partnerships.css';
import '../../../Components/Product/Content/Content.css';
import Card from '../../../Components/Product/Card/Card';
import {dummyBusinesses} from '../../../objects/test-objects/test-objects';
import axios from 'axios';

function Partnerships() {
    const { business } = useContext(BusinessContext); // Access user and setUser from context
    const [partners, setPartners] = useState([]);
    const suggPartners = dummyBusinesses(3);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 
    const [hasPartners, setHasPartners] = useState(false);

    useEffect(() => {
        // Prevent body from scrolling when the component mounts
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        // Fetch partners when the component mounts
        const fetchPartners = async () => {
            try {
                // Step 1: Fetch the list of partner IDs for the given business
                const response = await axios.get(`http://localhost:3001/api/businesses/get-partners/${business.id}`);
                const data = response.data; // Assuming response.data is an array of partner IDs
                const partnersData = Array.isArray(data) ? data : [data];
                setPartners(partnersData);
                console.log("Partners Data:", partnersData);
                setHasPartners(true);
            } catch (err) {
                console.error('Error fetching partners:', err.response?.data || err.message);
                const errorMessage = err.response?.data?.error;
        
                if (errorMessage === 'No partners found for this business.') {
                    setHasPartners(false);
                    setPartners([]); // Ensure partners array is empty
                } else {
                    console.log(errorMessage);
                    setError(errorMessage || 'An error occurred while fetching partners.');
                }
                console.log(err);
            } finally {
                setLoading(false);
            }        
        };
        fetchPartners();
    }, [business]);
    
    if (loading) {
        return <div>Loading partners...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    const updatePartner = (id, newStatus) => {
        console.log("NEW STATUS");
    }

    return (
        <div className="content partnerships">
            <div className="content-header">
                <h1>Partners</h1>
            </div>
            <div className="content-detail">
                <div className="subheader">
                    <h2>My Partners</h2>
                    <p>({partners.length} active)</p>
                </div>
                {!hasPartners ? <div className='no-partners'>Invite other members to create your first partnership!</div> : null}
                <div className="partner-cards">
                    {hasPartners ? partners.map(partner => (
                        <Card key={partner.PK} partnerData={partner} status='partner' setStatus={updatePartner}/>
                    )) : null}
                </div>
                <div className="subheader">
                    {suggPartners ? <h2>Suggested Partners</h2> : null}
                    {suggPartners ? <p>♦ Powered by AI ♦</p> : null}
                </div>
                <div className="partner-cards">
                    {suggPartners.map(partner => (
                        <Card key={partner.id} partnerData={partner} status='suggested' setStatus={updatePartner}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partnerships;