import React, { createContext, useState } from 'react';

// Create User Context
export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const [business, setBusiness] = useState({id:'', name:'', logo:'', desc:'', owner:'', industry:'', address:'', email:'', phone:'', website:''});
  
    return (
      <BusinessContext.Provider value={{ business, setBusiness }}>
        {children}
      </BusinessContext.Provider>
    );
  };