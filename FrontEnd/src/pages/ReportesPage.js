import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';

export const ReportesPage = () => {
   useTitle('Dashboard IoT | Reportes');
   return (
      <>
         <Sidebar />
         <section className='homepage'>
            <Header />
            <h1>
               Reportes
            </h1>
         </section>
      </>
   )
}
