import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';


//===================TEST CONEXIÓNO CON ESP8266 POR MQTT===========================
// import { GraphPotenciometro } from '../components/TEST_MQTT_GRAPH/GraphPotenciometro';
import { Graph } from '../components/TEST_MQTT_GRAPH/Graph';
import { Toggle } from '../components/TEST_MQTT_GRAPH/Toggle';

export const HomePage = () => {


  //=======TEST ESP=======
  // const [value, setValue] = useState(0)
  //=====================


  //Auth - LogIn 
  const { authUser } = useStateContext();
  //=======================

  return (
    <>
      {authUser === 'false' ? <Navigate to='/tipo-usuario' /> : (
        <>
          {/* <Sidebar /> */}
          <Header />
          <section className='homepage'>
            <h1>
              Dashboard IoT
            </h1>

            {/*Prueba Grafica de Datos del ESP8266 Potenciometro*/}
            {/* <br />
            <p><strong>Prototipo 1.- ESP8266 Potenciometro</strong></p>
            <br />
            <Graph device='potenciometro' /> */}


            {/*Prueba Grafica de Datos del ESP8266 Temperatura*/}
            <div className='Sensor'>
              <p><strong>Prototipo 1.- ESP8266 Temperatura</strong></p>
              <Graph device='Temperatura' />
            </div>
            <div className='Sensor'>
              <p><strong>Encender / Apagar Led</strong></p>
              <Toggle />
            </div>

          </section>
        </>
      )
      }
    </>
  )
}