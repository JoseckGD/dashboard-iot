import '../styles/HomePage.css';
import '../styles/UsuariosPage.css';
import homepage from '../img/homepage.png';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { Formulario } from "../components/Formulario"

import { useState } from 'react';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

export const UsuariosPage = () => {

  const [active, setActive] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  const handleAddUser = () => {
    setActive(true);
    setIsAddUser(true);
  }

  //Auth - LogIn 
  const { authUser } = useStateContext();
  //=======================

  // console.log(active);

  const handleModify = (id) => {
    // console.log(id);
    setIsAddUser(false);
    setActive(false);
    setActive(true);
  }


  useTitle('Dashboard IoT | Usuarios')
  return (
    <>
      {authUser === false ? <Navigate to='/tipo-usuario' /> : (
        <>
          <Sidebar />
          <section className='homepage'>
            <Header />
            <h1>Usuarios</h1>
            <Button text='Agregar un Usuario' icon={homepage} bgColor={'#33b5e5'} evento={handleAddUser} />
            <Table title='usuarios' eventoModify={handleModify} />
            {active &&
              <>
                <Formulario
                  setActive={setActive}
                  isAddUser={isAddUser}
                  inputs={isAddUser ? [
                    'Nombre:text',
                    'Telefono:text',
                    'Correo:text',
                    'Rol:select:Administrador:Operador',
                    'Contraseña:password',
                    'Confirmar Contraseña:password',
                  ] : [
                    'Nombre:text',
                    'Telefono:text',
                    'Correo:text',
                    'Rol:select:Administrador:Operador',
                  ]}
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
        </>
      )}
    </>
  )
}
