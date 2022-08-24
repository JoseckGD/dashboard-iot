import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export const ReportesPage = () => {
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
