import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

export const ReportesPage = () => {
   useTitle('Dashboard IoT | Reportes');

   //Auth - LogIn 
   const { authUser, } = useStateContext();
   //=======================
   return (
      <>
         {authUser === false ? <Navigate to='/tipo-usuario' /> : (

            <>
               <Sidebar />
               <section className='homepage'>
                  <Header />
                  <h1>
                     Reportes
                  </h1>
               </section>
            </>
         )}</>
   )
}