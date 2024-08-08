import React, { createContext, useState } from 'react';

export const CntContext = createContext();

export const CntProvider = ({ children }) => {
  const [cnt, setCnt] = useState(0);

  return (
    <CntContext.Provider value={{ cnt, setCnt }}>
      {children}
    </CntContext.Provider>
  );
};
