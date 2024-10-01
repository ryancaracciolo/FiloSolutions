import { useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../../../Components/Product/LoadingScreen/LoadingScreen';
import Card from '../../../Components/Product/Card/Card';
import './ReferralProfile.css'
import axios from 'axios';

function ReferralProfile() {
    const { businessId } = useParams(); // Extracts businessId from the URL
    const location = useLocation();
    const [business, setBusiness] = useState(null);
    const [partnerId, setPartnerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 


    // Extract query parameter (ref)
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const partnerId = query.get('ref');
        setPartnerId(partnerId);
        fetchBusiness();

    }, [businessId, location.search]);

    const fetchBusiness = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/api/businesses/get-business/${businessId}`);
            const data = response.data;
            console.log(data);
            setBusiness(data);
        } catch (err) {
            console.error('Error fetching business:', err.response?.data || err.message);
            const errorMessage = err.response?.data?.error;
    
            if (errorMessage !== 'No info found for this business.') {
                setError(errorMessage || 'An error occurred while fetching business.');
            }
            console.log(err);
        } finally {
            console.log("FETCH PARTNERS COMPLETED.");
            setLoading(false);
        }        
    };

    return (
        <div className='referral-wrapper'>
            { loading ? (
                <LoadingScreen isLoading={loading}/>
            ) : (
                error ? (
                    <h1>Error: {error}</h1>
                ) : (
                    <div className='card-wrapper'>
                        <Card key={business.id} partnerData={business} status='Referral'/>
                        <h2 className='powered-by'>Powered by Filo</h2>
                    </div>
                )
            )}
        </div>
    );
}

export default ReferralProfile;
