import React, {useState} from 'react';
import './Row.css';
import CircleInitials from '../CircleInitials/CircleInitials'
import StatusButton from './StatusButton';

const Row = ({leadData, updateLead, leadSelected, checked}) => {
    const date = new Date(leadData.createdAt).toLocaleDateString()

    function getRelativeDateDescription(date) {
        const inputDate = new Date(date);
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startOfInput = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
        const dayDifference = Math.floor((startOfToday - startOfInput) / (1000 * 60 * 60 * 24));
        if (dayDifference === 0) { return "Today"; }
        if (dayDifference === 1) { return "Yesterday"; }
        // Check if the date is within this week (starting from Sunday)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday of this week
        if (inputDate >= startOfWeek) { return "This Week"; }
        // Check if the date is within this month
        if (
          inputDate.getFullYear() === today.getFullYear() &&
          inputDate.getMonth() === today.getMonth()
        ) { return "This Month"; }
        // Check if the date is within this year
        if (inputDate.getFullYear() === today.getFullYear()) { return "This Year";}
        // If none of the above, it must be earlier
        return "Earlier";
    }

    const handleCheckboxClick = () => {
        console.log("checkbox clicked");
    }

    return (
        <tr>
            <td><input type="checkbox" checked={checked} onChange={() => leadSelected({lead: leadData})} /></td>
            {(leadData.direction === 'Received') ? <td className="received">Received</td> : <td className="shared">Shared</td>}
            <td>{date}</td>
            <td>
                <div className='cust-name'>
                    <CircleInitials businessName={leadData.name} />
                    <span >{leadData.name}</span>
                </div>
            </td>
            <td className='cust-email'>{leadData.email}</td>
            <td>
                <StatusButton status={leadData.status} setStatus={(newStatus) => updateLead({leadId: leadData.id, otherBusinessId: leadData.otherBusinessId, newStatus: newStatus})}/>
            </td>
            <td className='partners'>{leadData.otherBusinessName}</td>
            <td>{getRelativeDateDescription(leadData.updatedAt)}</td>
        </tr>
    );
};

export default Row;