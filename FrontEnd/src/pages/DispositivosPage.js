import '../styles/HomePage.css';
import '../styles/DispositivosPage.css'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import { Table } from '../components/Table';
import { Formulario } from "../components/Formulario"

import { useEffect, useState } from 'react';

import homepage from '../img/homepage.png';
import { Button } from '../components/Button';


const initialForm = {
  Nombre: "",
  Tipo: "",
  Estado: "",
  Dato_medida: "",
  id: null,
}

export const DispositivosPage = () => {
  useTitle('Dispositivos IoT');


  const [active, setActive] = useState(false);
  const [isAddDispositivo, setIsAddDispositivo] = useState(false);

  //Auth - LogIn 
  const { authUser, setUrl, dbUser: data, deleteDevice } = useStateContext();
  //=======================
  useEffect(() => {
    // setUrl("https://dashboard--test.herokuapp.com/selectdevices");
    setUrl("http://localhost:5051/selectdevices");
  })

  const handleAddUser = () => {
    setActive(true);
    setIsAddDispositivo(true);
  }

  const handleModify = (id) => {
    setIsAddDispositivo(false);
    setActive(false);
    setActive(true);
  }

  const handleDelete = (id) => {
    window.confirm(`¿Seguro que deseas eliminar el dispositivo ${id} ?`) &&
      deleteDevice({ id });
  }

  return (
    <>
      {authUser === 'false' ? <Navigate to='/tipo-usuario' /> : (
        <>
          <Sidebar />
          <section className='homepage'>
            <Header />
            <section className='section-dispositivos'>
              <h1>
                Dispositivos IoT
              </h1>
              <Button
                text='Agregar Dispositivo'
                icon={homepage}
                bgColor={'#33b5e5'}
                evento={handleAddUser}
              />
              <Table
                title='dispositivos'
                eventoModify={handleModify}
                eventoDelete={handleDelete}
                data={data}
              />
              {active &&
                <>
                  <Formulario
                    setActive={setActive}
                    isAdd={isAddDispositivo}
                    inputs={isAddDispositivo ? [
                      'Nombre:text',
                      'Tipo:text',
                      'Estado:select:True:False',
                      'Dato_medida:text',
                    ] :
                      [
                        'Nombre:text',
                        'Tipo:text',
                        'Estado:select:True:False',
                        'Dato_medida:text',
                      ]
                    }
                    initialForm={initialForm}
                    to="dispositivos"
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