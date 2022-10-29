import React, { createContext, useContext, useEffect, useState } from 'react';
import fetchAJAX from '../helpers/fetch';
// import helpHttp from '../helpers/helpHttp';

const StateContext = createContext();

const initialMode = localStorage.getItem('themeMode');

const initialAuthUser = localStorage.getItem('authUser');

const initialAuthRol = localStorage.getItem('authRol');

export const ContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState(!initialMode ? 'Light' : initialMode);
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);

  const [authUser, setAuthUser] = useState(initialAuthUser);
  const [rolUser, setRolUser] = useState(!initialAuthRol ? 'rol' : initialAuthRol);

  const [dbUser, setDbUser] = useState(null);
  // const [dataAllUser, setDataAllUser] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
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

  useEffect(() => {
    const isAuthUser = window.localStorage.getItem('authUser');
    if (isAuthUser) {
      setAuthUser(isAuthUser);
    }
  }, [authUser])


  //Rol del usuario actual
  const setRolConcurrentUser = (rol) => {
    setRolUser(rol);
    localStorage.setItem('authRol', rol);
  }

  //Usuario Auntenticado FrontEnd
  const handleAuth = (prop) => {
    console.log(prop);
    setAuthUser(prop);
    localStorage.setItem('authUser', prop);
  };

  //Cerrar Sesion
  const handleCloseSesion = () => {
    fetchAJAX({
      url: `http://localhost:5051/deleteusuerauth`,
      resSuccess: (res) => {
        console.log(res);

        if (res.success !== false) {
          setRolConcurrentUser('');
          setAuthUser(false);
          // handleAuth();
          // setRolUser('rol');
        }
      },
      resError: (err) => {
        setRolConcurrentUser('');
        // handleAuth();
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

  //botnos OnClcik
  const Eliminar = () => {
    alert('click Eliminar')
  }

  // crear un Usuario
  const createUser = (data) => {
    // const dataF = {
    //   id_usuario: data.id,
    //   nombre: data.Nombre,
    //   numero_telefono: data.Telefono,
    //   correo: data.Correo,
    //   rol: data.Rol
    // }
    // console.log(dataF);
    // alert(data);

    // fetchAJAX({
    //   url: 'http://localhost:5051/insertuser',
    //   resSuccess: (res) => {

    //     if (res.success === true) {
    //       setDbUser(res.result);
    //       setError(null);
    //     } else {
    //       setDbUser(null);
    //       setError(res.message);
    //     }
    //     setLoading(false);
    //   },
    //   resError: (err) => {
    //     console.log(err);
    //   }
    // })
    // data.id = Date.now();
    // let options = {
    //   body: data,
    //   headers: { "content-type": "application/json" }
    // };
    // api.post(url, options).then((res) => {
    //   //console.log(res);
    //   if (!res.err) {
    //     setDb([...db, res]);
    //   } else {
    //     setError(res);
    //   }
    // });
    // setDb([...db, data]);
  };

  // actualizar data de usuario
  const updateData = (data) => {
    console.log(data);
    // let endpoint = `${url}/${data.id}`;

    // let options = {
    //    body: data,
    //    headers: { "content-type": "application/json" }
    // };
    // api.put(endpoint, options).then((res) => {
    //    //console.log(res);
    //    if (!res.err) {
    //       let newData = db.map(el => el.id === data.id ? data : el);
    //       setDb(newData);
    //    } else {
    //       setError(res);
    //    }
    // });

  };


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
    // dataAllUser,
    dbUser,
    error,
    loading,
    Eliminar,
    updateData,
    setDataToEdit,
    dataToEdit,
    createUser
  };

  return (
    <StateContext.Provider value={data}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
