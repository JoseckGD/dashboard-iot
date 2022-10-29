import { CardTipoUsuario } from '../components/CardTipoUsuario';
import '../styles/TipoUsuarioPage.css';
import icon from '../img/user.png';
import { Navigate, NavLink } from 'react-router-dom';
import { Header } from '../components/Header';
import { useTitle } from '../hooks/useTitle';
import { useStateContext } from '../contexts/ContextProvider';

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
          <Header btn={true} />
          <section className="tipoUsuario">
            <nav className='opciones'>
              <NavLink to='/login_Gerente'>
                <CardTipoUsuario tipo='Gerente' icono={icon} />
              </NavLink>

              <NavLink to='/login_Operador'>
                <CardTipoUsuario tipo='Operador' icono={icon} />
              </NavLink>

              <NavLink to='/login_Admin'>
                <CardTipoUsuario tipo='Administrador' icono={icon} />
              </NavLink>

            </nav>
          </section>
        </>
      )}

    </>
  )
}