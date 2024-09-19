// React imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './objects/UserContext/UserContext';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <App />
    </UserProvider>
);
