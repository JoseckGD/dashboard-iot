import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';

export const DispositivosPage = () => {
   useTitle('Dispositivos IoT');
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


