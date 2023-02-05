import React, { createContext, useContext, useEffect, useState } from 'react';
import fetchAJAX from '../helpers/fetch';
// import helpHttp from '../helpers/helpHttp';

const StateContext = createContext();

const initialMode = localStorage.getItem('themeMode');

const initialAuthUser = localStorage.getItem('authUser');

const initialAuthRol = localStorage.getItem('authRol');

let hora = '';

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


  const [warn, setWarn] = useState(null);
  const [messageError, setMessageError] = useState('');

  //const urlBase = 'https://dashboardiotest.herokuapp.com';
  // const urlBase = 'http://localhost:5051/';

  useEffect(() => {
    if (url === "") return

    setLoading(true);

    fetchAJAX({
      url: url,
      resSuccess: (res) => {

        console.log(res)

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
      // url: `${urlBase}/deleteusuerauth`,
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




  const createUser = (data) => {
    const newUser = {
      // id_usuario: data.id,
      nombre: (data.Nombre.trim()).toLowerCase(),
      numero_telefono: (data.Telefono.trim()).toLowerCase(),
      correo: (data.Correo.trim()).toLowerCase(),
      rol: (data.Rol.trim()).toLowerCase(),
      contrasena: (data.Contraseña.trim()),
    };
    fetchAJAX({
      url: 'http://localhost:5051/insertuser',
      //url: `${urlBase}/insertuser`,
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
          //setUrl(`${urlBase}/selectusers`);
          getData();

          setWarn(true)
          setMessageError("Se ha agregado un nuevo usuario")
          setTimeout(() => {
            setWarn(false);
          }, 30000);

        } else {
          setWarn(true)
          setMessageError(`Error: ${res.message}`)
          setTimeout(() => {
            setWarn(false);
          }, 3000);
        }

      },
      resError: (error) => {
        setWarn(true)
        setMessageError("Error: Intentelo más tarde")
        setTimeout(() => {
          setWarn(false);
        }, 3000);
      }
    })
  };


  //Eliminar Dispositivo
  const deleteDevice = (data) => {

    let endpoint = `http://localhost:5051/deletedevice/${data.id}`;
    // let endpoint = `${urlBase}/deletedevice/${data.id}`;

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
    // let endpoint = `${urlBase}/deleteuser/${data.id}`;

    let options = {
      url: endpoint,
      settings: {
        method: "DELETE",
      },
      resSuccess: (json => {
        setUrl('http://localhost:5051/selectusers');
        getData();
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
        if (json.success) {
          setUrl('http://localhost:5051/selectdevices');
          getData();

          setWarn(true)
          setMessageError('Nuevo Dispositivo Agregado')
          setTimeout(() => {
            setWarn(false);
          }, 3000);

        } else {
          setWarn(true)
          setMessageError(`Error: ${json.message}`)
          setTimeout(() => {
            setWarn(false);
          }, 3000);
        }

      }),
      resError: (err => {
        setWarn(true)
        setMessageError(`Error: Intentelo Más Tarde`)
        setTimeout(() => {
          setWarn(false);
        }, 3000);
      }),

    };

    fetchAJAX(options)
  }



  //Actualizar dispositivo
  const updateDevice = (url, data) => {
    let options = {
      url,
      settings: {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      },
      resSuccess: (json => {

        if (json.success) {
          //Actualizar la tabla de dispositivos en tiempo real
          setUrl('http://localhost:5051/selectdevices');
          getData();

          setWarn(true)
          setMessageError("Se ha actualizado el registro")
          setTimeout(() => {
            setWarn(false);
          }, 3000);

        } else {
          setWarn(true)
          setMessageError("Error: al actualizar el registro")
          setTimeout(() => {
            setWarn(false);
          }, 3000);
        }

      }),
      resError: (err => {
        setWarn(true)
        setMessageError("Error: al actualizar el registro")
        setTimeout(() => {
          setWarn(false);
        }, 3000);
      }),

    };

    fetchAJAX(options)
  }


  //Actualizar Usuario
  const updateUser = (url, data) => {
    let options = {
      url,
      settings: {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      },
      resSuccess: (json => {
        if (json.success) {

          setUrl('http://localhost:5051/selectusers');
          getData();

          setWarn(true)
          setMessageError("Usuario Actualizado")
          setTimeout(() => {
            setWarn(false);
          }, 3000);
        }

      }),
      resError: (err => {
        setWarn(true)
        setMessageError("Error al actualizar el registro")
        setTimeout(() => {
          setWarn(false);
        }, 3000);
      }),

    };

    fetchAJAX(options)
  }

  const insertDataIot = (url, data) => {
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
        // console.log(json)
      }),
      resError: (err => {
        console.log("Huvo un Error al Insertar los datos a la BD", err)
      }),

    };

    //lo ejecuta una ves cada cierto tiempo

    if (hora === '') {
      fetchAJAX(options);
      hora = data.hora;
      return
    } else if (data.hora === hora) {
      return
    } else {
      hora = data.hora;
      fetchAJAX(options);
    }
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
    deleteData,
    setDataToEdit,
    dataToEdit,
    createUser,
    setUrl,
    createData,
    deleteDevice,
    updateDevice,
    updateUser,
    insertDataIot,
    warn,
    messageError,
    setWarn,
    setMessageError
    //urlBase
  };

  return (
    <StateContext.Provider value={data}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
