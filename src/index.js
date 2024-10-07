// React imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BusinessProvider, SearchProvider } from './objects/UserContext/UserContext';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SearchProvider>
        <BusinessProvider>
            <App />
        </BusinessProvider>
    </SearchProvider>
);
