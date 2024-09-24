import React, {useState, useEffect} from 'react';
import './Opportunities.css';
import '../../../Components/Product/Content/Content.css';
import {dummyLeads} from '../../../objects/test-objects/test-objects';
import Row from '../../../Components/Product/Row/Row';
import TabularMenu from '../../../Components/Product/TabularMenu/TabularMenu';



function Opportunities() {
    const tabItems = ['Received', 'Shared', 'All Referrals'];
    const [activeTab, setActiveTab] = useState('Received');
    const leads = dummyLeads(2);

    useEffect(() => {
        // Prevent body from scrolling when the component mounts
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="content opportunities">
            <TabularMenu headerName={"Opportunities"} tabItems={tabItems} activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className="content-detail">
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
                            <Row key={lead.lead.id} leadData={lead}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Opportunities;