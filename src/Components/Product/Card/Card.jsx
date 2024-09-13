import React from 'react';
import './Card.css';


const Card = () => {
    return (
    <div class="card">
        <div class="card-header">
            <div class="card-icon check-icon">✔️</div>
            <img src="logo.png" alt="Company Logo" class="company-logo" />
            <div class="card-icon share-icon">🔗</div>
        </div>
        <div class="card-body">
            <h3 class="company-name">Hubbard Construction</h3>
            <p class="contact-name">Brian Cooper</p>
            <div class="tags">
                <span class="tag home-services">Home Services</span>
                <span class="tag building">Building</span>
            </div>
            <p class="description">
                Marsh & Woods is an Architecture and Interior Design Firm managing projects in historical renovation, club facilities, academic, multi-family housing, and corporate planning.
            </p>
        </div>
        <div class="card-footer">
            <button class="send-referral">Send Referral ➔</button>
        </div>
    </div>    
    );
};

export default Card;