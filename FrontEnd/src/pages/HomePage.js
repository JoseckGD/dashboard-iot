import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export const HomePage = () => {

  //Auth - LogIn == PENDIENTE
  const { authUser } = useStateContext();
  console.log(authUser);
  //=======================

  return (
    <>
      {authUser === false ? <Navigate to='/tipo-usuario' /> : (
        <>
          <Sidebar />
          <section className='homepage'>
            <Header />
            <h1>
              Dashboard IoT
            </h1>
          </section>
        </>
      )}
    </>
  )
}