import { CardTipoUsuario } from '../components/CardTipoUsuario';
import '../styles/TipoUsuarioPage.css';
// import icon from '../img/user.png';
import Gerente from '../img/gerente.png';
import Operador from '../img/operador.png';
import Administrador from '../img/administrador.png'
import { Navigate, NavLink } from 'react-router-dom';
import { Header } from '../components/Header';
import { useTitle } from '../hooks/useTitle';
import { useStateContext } from '../contexts/ContextProvider';
import { useState } from 'react';

export const TipoUsuarioPage = () => {
  useTitle('Dashboard IoT | Tipo de usuario');

  //Auth -
  const { authUser } = useStateContext();
  // console.log(authUser === 'true')
  //================================

  return (
    <>
      {authUser === 'true' ? <Navigate to='/' /> : (
        <>
          <Header botones={false} />
          <h1>Iniciar Sesion como...</h1>
          <section className="tipoUsuario">
            <nav className='opciones'>
              <NavLink to='/login_Gerente'>
                <CardTipoUsuario tipo='Gerente' icono={Gerente} />
              </NavLink>

              <NavLink to='/login_Operador'>
                <CardTipoUsuario tipo='Operador' icono={Operador} />
              </NavLink>

              <NavLink to='/login_Admin'>
                <CardTipoUsuario tipo='Administrador' icono={Administrador} />
              </NavLink>

            </nav>
          </section>
        </>
      )}

    </>
  )
}