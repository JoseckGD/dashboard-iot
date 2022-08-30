import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';

export const UsuariosPage = () => {
   useTitle('Dashboard IoT | Usuarios')
   return (
      <>
         <Sidebar />
         <section className='homepage'>
            <Header />
            <h1>
               Usuarios
            </h1>
         </section>
      </>
   )
}
