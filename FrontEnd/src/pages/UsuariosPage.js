import '../styles/HomePage.css';
import '../styles/UsuariosPage.css';
import homepage from '../img/homepage.png';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { Formulario } from "../components/Formulario"

import { useEffect, useState } from 'react';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

const initialFormModify = {
  Nombre: "", //nombre:
  Telefono: "", //numero_telefono:
  Correo: "", //correo
  Rol: "", //rol
  id: null, //id_usuario
};


const initialForm = {
  Nombre: "", //nombre:
  Telefono: "", //numero_telefono:
  Correo: "", //correo
  Rol: "", //rol
  Contraseña: "", //rcontrasna
  Confirmar_Contraseña: "", //repeat_contrasna
  id: null, //id_usuario
};


export const UsuariosPage = () => {

  const [active, setActive] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  const handleAddUser = () => {
    setActive(true);
    setIsAddUser(true);
  }


  //Auth - LogIn 
  const { authUser, deleteData, setUrl, dbUser: data, urlBase } = useStateContext();
  //=======================

  // console.log(active);

  useEffect(() => {
    setUrl(`${urlBase}/selectusers`);
  })


  const handleModify = (id) => {
    // console.log(id);
    setIsAddUser(false);
    setActive(false);
    setActive(true);
  }

  const handleDelete = (id) => {
    window.confirm(`¿Seguro que deseas eliminar el usuario ${id} ?`) &&
      deleteData({ id });
  }


  useTitle('Dashboard IoT | Usuarios')
  return (
    <>
      {authUser === false ? <Navigate to='/tipo-usuario' /> : (
        <>
          <Sidebar />
          <section className='homepage'>
            <Header />
            <section className='section-usuarios'>
              <h1>Usuarios</h1>
              <Button text='Agregar un Usuario' icon={homepage} bgColor={'cornflowerblue'} evento={handleAddUser} />
              <Table
                title='usuarios'
                eventoModify={handleModify}
                eventoDelete={handleDelete}
                data={data}
              />
              {active &&
                <>
                  <Formulario
                    setActive={setActive}
                    initialForm={initialForm}
                    initialFormModify={initialFormModify}
                    isAdd={isAddUser}
                    inputs={isAddUser ? [
                      'Nombre:text',
                      'Telefono:text',
                      'Correo:text',
                      'Rol:select:Administrador:Operador',
                      'Contraseña:password',
                      'Confirmar_Contraseña:password',
                    ] : [
                      'nombre:text',
                      'numero_telefono:text',
                      'correo:text',
                      'rol:select:Administrador:Operador',
                    ]}
                    to="usuarios"
                  // inputs={[
                  //   'Nombre:text',
                  //   'Telefono:text',
                  //   'Correo:text',
                  //   'Rol:select:Administrador:Operador',
                  // ]}
                  // handleSubmit={handleSubmit}
                  />
                </>

              }
            </section>
          </section>
        </>
      )}
    </>
  )
}