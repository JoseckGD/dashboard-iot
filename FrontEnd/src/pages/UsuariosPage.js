import '../styles/HomePage.css';
import '../styles/UsuariosPage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { Formulario } from "../components/Formulario"

import { useState } from 'react';
import { Table } from '../components/Table';

export const UsuariosPage = () => {

  const [active, setActive] = useState(false);

  // console.log(active);

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
        <Table title='usuarios' />
        {active &&
          <>
            <Formulario
              setActive={setActive}
              inputs={['Nombre:text', 'Usuario:text', 'Rol:select:administrador:operador',
                'Password:password']}
              handleSubmit={handleSubmit}
            />
          </>

        }
      </section>
    </>
  )
}
