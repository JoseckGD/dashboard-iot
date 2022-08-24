import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export const DispositivosPage = () => {
   return (
      <>
         <Sidebar />
         <section className='homepage'>
            <Header />
            <h1>
               Dispositivos IoT
            </h1>
         </section>
      </>
   )
}


