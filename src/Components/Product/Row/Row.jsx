import React from 'react';
import './Row.css';
//import { ReactComponent as CheckIcon } from '../../../Assets/Icons/checkmark-icon.svg';

function getRandomBinary() {
    return Math.floor(Math.random() * 2);
}

const Row = ({leadData}) => {

    const lead = leadData.lead;
    const partner = leadData.partner;
    const customer = leadData.customer;

    const st = lead.status.toLowerCase();
    const d = lead.date.toLocaleDateString()

    return (
        <tr>
            <td><input type="checkbox" /></td>
            {getRandomBinary() ? <td className="received">Received</td> : <td className="shared">Shared</td>}
            <td>{d}</td>
            <td>{customer.custFN + " " + customer.custLN}</td>
            <td className='cust-email'>{customer.custEmail}</td>
            <td>
                <span className={'status '+st}>{lead.status}</span>
            </td>
            <td className='partners'>{partner.name}</td>
            <td>Today</td>
        </tr>
    );
};

export default Row;