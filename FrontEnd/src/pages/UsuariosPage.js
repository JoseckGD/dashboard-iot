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

export const UsuariosPage = () => {

  const [active, setActive] = useState(false);

  // console.log(active);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!form.name || !form.constellation) {
    //   alert("Datos incompletos");
    //   return;
    // }

    // if (form.id === null) {
    //   createData(form);
    // } else {
    //   updateData(form);
    // }

    // handleReset();
  }

  const handleModify = (id) => {
    // console.log(id);
    setActive(false);
    setActive(true);
  }


  useTitle('Dashboard IoT | Usuarios')
  return (
    <>
      <Sidebar />
      <section className='homepage'>
        <Header />
        <h1>Usuarios</h1>
        <Button text='Agregar un Usuario' icon={homepage} bgColor={'#33b5e5'} evento={setActive} />
        <Table title='usuarios' eventoModify={handleModify} />
        {active &&
          <>
            <Formulario
              setActive={setActive}
              inputs={[
                'Nombre:text',
                'Telefono:text',
                'Correo:text',
                'Rol:select:Administrador:Operador',
              ]}
            // handleSubmit={handleSubmit}
            />
          </>

        }
      </section>
    </>
  )
}
