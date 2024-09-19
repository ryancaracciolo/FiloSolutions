import React, { createContext, useState } from 'react';

// Create User Context
export const UserContext = createContext();

// Create User Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};