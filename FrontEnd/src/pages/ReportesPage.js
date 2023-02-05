import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import CardDispositivosIoT from '../components/CardDispositivosIoT';
import { useEffect, useState } from 'react';
import fetchAJAX from '../helpers/fetch';


export const ReportesPage = () => {
  useTitle('Dashboard IoT | Reportes');

  //Auth - LogIn 
  const { authUser, urlBase } = useStateContext();
  const [dataIoT, SetDataIot] = useState();
  const [dataIoTDB, setDataIoTDB] = useState();
  const [dataBusqueda, setDataBusqueda] = useState({ iot: '', fecha: '' })
  //=======================

  useEffect(() => {

    fetchAJAX({
      url: `http://localhost:5051/selectdevices`,
      //url: `${urlBase}/selectdevices`,
      resSuccess: (res) => {

        if (res.success === true) {
          SetDataIot(res)
        } else {
          SetDataIot(null)
          console.log("Error al Consultar los Datos de los Dispositivos IoT")
        }
      },
      resError: (err) => {
        console.log(err);
      }
    })

  }, [urlBase])


  const handleChange = (e) => {

    setDataBusqueda({
      ...dataBusqueda,
      'iot': e.target.id.split('fecha-')[1],
      [e.target.name]: e.target.value
    })

    let settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ iot: e.target.id.split('fecha-')[1], fecha: e.target.value })
    }

    fetchAJAX({
      url: `http://localhost:5051/selectdevicewithdate`,
      // url: `${urlBase}/selectdevicewithdate`,
      settings,
      resSuccess: (res) => {
        if (res.success === true) {
          setDataIoTDB(res.result.rows)
        }
      },
      resError: (err) => {
        console.log("Error al Obtener los Datos del Dispositivo IoT", err)
      }
    })

  }

  return (
    <>
      {authUser === false ? <Navigate to='/tipo-usuario' /> : (

        <>
          {/* <Sidebar /> */}
          <Header />
          <section className='homepage'>
            <h1>
              Reportes
            </h1>
            {dataIoT &&
              <div className="container-devices">
                {dataIoT.result.map(el => {
                  return (
                    <CardDispositivosIoT
                      key={el.id_dispositivo_iot}
                      nombrIoT={el.nombre}
                      handleChange={handleChange}
                      value={dataBusqueda}
                      dataIoTDB={dataIoTDB}
                      setDataIoTDB={setDataIoTDB}
                      setDataBusqueda={setDataBusqueda}
                    />)
                })}
              </div>
            }



          </section>
        </>
      )}</>
  )
}