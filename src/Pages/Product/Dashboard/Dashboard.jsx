import React from 'react';
import './Dashboard.css';
import '../../../Components/Product/Content/Content.css';
import Login from '../Authentication/Authentication';


function Dashboard() {
    return (
        <div className="content dashboard">
            <div className="content-header">HEADER</div>
            <div className="content-detail">
                <Login />
            </div>
        </div>
    );
};

export default Dashboard;