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
  //let url = "http://localhost:5051/selectusers";
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (url === "") return

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

  //Obtener datos 
  const getData = () => {
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
  }

  //autenticacion de usuario
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
    const newUser = {
      id_usuario: data.id,
      nombre: data.Nombre,
      numero_telefono: data.Telefono,
      correo: data.Correo,
      rol: data.Rol,
      contrasena: data.Contrasena,
    };
    // console.log(newUser);
    fetchAJAX({
      url: 'http://localhost:5051/insertuser',
      settings: {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      },
      resSuccess: (res) => {
        if (res.success) {
          setUrl('http://localhost:5051/selectusers');
          getData();
          window.alert(res.message);
        } else {
          window.alert(res.message);
        }

      },
      resError: (error) => {
        console.log(error);
      }
    })
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

  //Eliminar Dispositivo
  const deleteDevice = (data) => {

    let endpoint = `http://localhost:5051/deletedevice/${data.id}`;

    let options = {
      url: endpoint,
      settings: {
        method: "DELETE",
      },
      resSuccess: (json => {
        json.success === true ?
          getData() :
          console.log(json);
      }),
      resError: (err => {
        console.log("Huvo un Error al Eliminar el Dispositivo", err)
      }),

    };

    fetchAJAX(options)
  }

  //Eliminar Usuario
  const deleteData = (data) => {

    let endpoint = `http://localhost:5051/deleteuser/${data.id}`;

    let options = {
      url: endpoint,
      settings: {
        method: "DELETE",
      },
      resSuccess: (json => {
        console.log(json)
      }),
      resError: (err => {
        console.log("Huvo un Error al Eliminar el Usuario", err)
      }),

    };

    fetchAJAX(options)
  }

  //Crear Data
  const createData = (url, data) => {
    let options = {
      url,
      settings: {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      },
      resSuccess: (json => {
        console.log(json)
        setUrl('http://localhost:5051/selectdevices');
        getData();
      }),
      resError: (err => {
        console.log("Huvo un Error al Insertar el Registro", err)
      }),

    };

    fetchAJAX(options)
  }

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
    deleteData,
    setDataToEdit,
    dataToEdit,
    createUser,
    setUrl,
    createData,
    deleteDevice
  };

  return (
    <StateContext.Provider value={data}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
