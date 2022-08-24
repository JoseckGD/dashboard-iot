import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export const UsuariosPage = () => {
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
