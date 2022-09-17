import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

const initialMode = localStorage.getItem('themeMode');

export const ContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState(!initialMode ? 'Light' : initialMode);
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);

  const setMode = () => {
    if (currentMode === 'Light') {
      setCurrentMode('Dark');
      localStorage.setItem('themeMode', 'Dark');
    } else {
      setCurrentMode('Light');
      localStorage.setItem('themeMode', 'Light');
    }
  };

  const handleCloseSideBar = () => {
    if (activeMenu === true || screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
      // localStorage.setItem('isMenuActive', false);
    } else {
      setActiveMenu(true);
      // localStorage.setItem('isMenuActive', true);
    }
  }, [screenSize]);


  const data = {
    currentMode,
    setCurrentMode,
    screenSize,
    setScreenSize,
    activeMenu,
    setActiveMenu,
    setMode,
    handleCloseSideBar,
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={data}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
