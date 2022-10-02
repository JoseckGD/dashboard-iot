import '../styles/HomePage.css';
import '../styles/UsuariosPage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { Formulario } from "../components/Formulario"

import { useState } from 'react';

export const UsuariosPage = () => {

  const [active, setActive] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault()
    //...
  }


  useTitle('Dashboard IoT | Usuarios')
  return (
    <>
      <Sidebar />
      <section className='homepage'>
        <Header />
        <h1>Usuarios</h1>
        {active &&
          <Formulario
            setActive={setActive}
            inputs={['Nombre:text', 'Usuario:text', 'Rol:select:administrador:operador',
              'Password:password']}
            handleSubmit={handleSubmit}
          />
        }
      </section>
    </>
  )
}
