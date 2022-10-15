import React, { createContext, useContext, useEffect, useState } from 'react';
import fetchAJAX from '../helpers/fetch';
import helpHttp from '../helpers/helpHttp';

const StateContext = createContext();

const initialMode = localStorage.getItem('themeMode');

const initialAuthUser = localStorage.getItem('authUser');

const initialAuthRol = localStorage.getItem('authRol');

export const ContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState(!initialMode ? 'Light' : initialMode);
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);

  const [authUser, setAuthUser] = useState(initialAuthUser === null && (initialAuthUser === true ? true : false));
  const [rolUser, setRolUser] = useState(!initialAuthRol ? 'rol' : initialAuthRol);

  const [dbUser, setDbUser] = useState(null);
  const [dataAllUser, setDataAllUser] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let url = "http://localhost:5051/selectusers";

  useEffect(() => {
    setLoading(true);
    fetchAJAX({
      url: url,
      resSuccess: (res) => {

        if (res.success === true) {
          setDbUser(res.result);
          setError(null);
        } else {
          setDbUser(null);
          setError(res.message);
        }
        setLoading(false);
      },
      resError: (err) => {
        console.log(err);
      }
    })

  }, [url]);

  //Rol del usuario actual
  const setRolConcurrentUser = (rol) => {
    setRolUser(rol);
    localStorage.setItem('authRol', rol);
  }

  //Usuario Auntenticado FrontEnd
  const handleAuth = () => {
    if (authUser === true) {
      setAuthUser(false);
      localStorage.setItem('authUser', false);
    } else {
      setAuthUser(true);
      localStorage.setItem('authUser', true);
    }
  };

  //Cerrar Sesion
  const handleCloseSesion = () => {
    fetchAJAX({
      url: `http://localhost:5051/deleteusuerauth`,
      resSuccess: (res) => {
        console.log(res);

        if (res.success !== false) {
          setRolConcurrentUser('');
          handleAuth();
          setRolUser('rol');
        }
      },
      resError: (err) => {
        setRolConcurrentUser('');
        handleAuth();
        console.log(err);
      }
    })
  };

  //Poner Modo
  const setMode = () => {
    if (currentMode === 'Light') {
      setCurrentMode('Dark');
      localStorage.setItem('themeMode', 'Dark');
    } else {
      setCurrentMode('Light');
      localStorage.setItem('themeMode', 'Light');
    }
  };

  //Manejar el cierre de la Sidebar
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
    setAuthUser,
    authUser,
    handleCloseSesion,
    rolUser,
    setRolUser,
    setRolConcurrentUser,
    handleAuth,
    dataAllUser,
    dbUser,
    error,
    loading
  };

  return (
    <StateContext.Provider value={data}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
