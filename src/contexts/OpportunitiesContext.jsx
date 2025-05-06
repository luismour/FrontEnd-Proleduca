import React, { createContext, useContext, useState } from 'react';

const OpportunitiesContext = createContext();

export const OpportunitiesProvider = ({ children }) => {
  const [opportunities, setOpportunities] = useState([]);

  return (
    <OpportunitiesContext.Provider value={{ opportunities, setOpportunities }}>
      {children}
    </OpportunitiesContext.Provider>
  );
};

export const useOpportunities = () => useContext(OpportunitiesContext);
