import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useTitle } from '../hooks/useTitle';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
// import { Table } from '../components/Table';

export const DispositivosPage = () => {
   useTitle('Dispositivos IoT');

   //Auth - LogIn 
   const { authUser } = useStateContext();
   //=======================
   return (
      <>
         {authUser === false ? <Navigate to='/tipo-usuario' /> : (
            <>
               <Sidebar />
               <section className='homepage'>
                  <Header />
                  <h1>
                     Dispositivos IoT
                  </h1>
                  {/* <Table title='dispositivos' /> */}
               </section>
            </>
         )}
      </>
   )
}


