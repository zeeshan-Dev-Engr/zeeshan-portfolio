import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext({
  isHoveringCard: false,
  setIsHoveringCard: (hover: boolean) => {},
  isHoveringNavbar: false,
  setIsHoveringNavbar: (hover: boolean) => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHoveringNavbar, setIsHoveringNavbar] = useState(false);
  return (
    <CursorContext.Provider value={{ isHoveringCard, setIsHoveringCard, isHoveringNavbar, setIsHoveringNavbar }}>
      {children}
    </CursorContext.Provider>
  );
}; 