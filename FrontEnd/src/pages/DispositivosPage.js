import '../styles/HomePage.css';
import '../styles/DispositivosPage.css'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import { Table } from '../components/Table';
import { Formulario } from "../components/Formulario"

import Message from '../components/loader message/Message';


import { useEffect, useState } from 'react';

import homepage from '../img/boton-mas.png';
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


  const { authUser, setUrl, dbUser: data, deleteDevice, warn, messageError, setMessageError, setWarn } = useStateContext();
  //=======================
  useEffect(() => {

    setUrl(`http://localhost:5051/selectdevices`);
    //setUrl(`${urlBase}/selectdevices`);
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
          {/* <Sidebar /> */}
          <Header />
          <section className='homepage'>
            {warn &&
              (messageError.includes('Error') ?
                <Message msg={messageError} bgColor={'#DC4C64'} active={true} />
                :
                <Message msg={messageError} bgColor={'cornflowerblue'} active={true} />)
            }
            <div className='titleBtn'>
              <h1>
                Dispositivos IoT
              </h1>
              <Button
                text='Agregar Dispositivo'
                icon={homepage}
                bgColor={'cornflowerblue'}
                evento={handleAddUser}
              />
            </div>
            <section className='section-dispositivos'>
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
                        'nombre:text',
                        'tipo:text',
                        'estado:select:True:False',
                        'dato_medida:text',
                      ]
                    }
                    initialForm={initialForm}
                    to="dispositivos"
                    setError={setWarn}
                    setMessageError={setMessageError}
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