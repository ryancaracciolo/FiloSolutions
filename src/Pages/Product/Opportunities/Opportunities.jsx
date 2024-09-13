import React from 'react';
import './Opportunities.css';
import '../../../Components/Product/Content/Content.css';
import {dummyLeads} from '../../../objects/test-objects/test-objects';
import Row from '../../../Components/Product/Row/Row';


function Opportunities() {

    const leads = dummyLeads(7);

    return (
        <div className="content opportunities">
            <div className="content-header">
                <h1>Opportunities</h1>
            </div>
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