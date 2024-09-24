import React, {useEffect, useState, useContext, useRef } from 'react';
import { BusinessContext } from '../../../objects/UserContext/UserContext';
import './Partnerships.css';
import Card from '../../../Components/Product/Card/Card';
import axios from 'axios';

const MyPartners = ({setPendingSent, setPendingReceived}) => {
    const { business } = useContext(BusinessContext);
    const [partners, setPartners] = useState([]);
    const [suggPartners, setSuggPartners] = useState([]);
    const [hasPartners, setHasPartners] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 
    const isFetched = useRef(false); // Ref to track if partners have been fetched


    const fetchPartners = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/businesses/get-partners/${business.id}`);
            const data = response.data;
            const partnersList = data["Confirmed"];
            const suggList = data["Suggested"];
            setPendingSent(data["Pending_Sent"])
            setPendingReceived(data["Pending_Received"])
            setPartners(partnersList);
            setSuggPartners(suggList);
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
            console.log("HELLO");
            setLoading(false);
            isFetched.current = true;
        }        
    };
    
    useEffect(() => {
        if (!isFetched.current) {
            console.log(isFetched.current);
            fetchPartners();
        }
    }, []);
    
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
        <div className="partner-detail">
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
    );
};

export default MyPartners;