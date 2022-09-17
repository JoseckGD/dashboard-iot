import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {


  //Auth - LogIn == PENDIENTE
  const [auth, setAuth] = useState(localStorage.getItem('auth'));

  let pages = useNavigate();

  useEffect(() => {
    if (auth === 'false') {
      pages('tipo-usuario');
    } else {
      setAuth(localStorage.getItem('auth', true))
    }
  }, [auth])
  //=======================

  return (
    <>
      <Sidebar />
      <section className='homepage'>
        <Header />
        <h1>
          Dashboard IoT
        </h1>
      </section>
    </>
  )
}
