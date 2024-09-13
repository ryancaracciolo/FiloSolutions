import React from 'react';
import './Partnerships.css';
import '../../../Components/Product/Content/Content.css';
import Card from '../../../Components/Product/Card/Card';


function Partnerships() {
    return (
        <div className="content partnerships">
            <div className="content-header">
                <h1>Partners</h1>
            </div>
            <div className="content-detail">
                <div className="subheader">
                    <h2>My Partners</h2>
                    <p>(3 active)</p>
                </div>
                <div className="partner-cards">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    );
};

export default Partnerships;