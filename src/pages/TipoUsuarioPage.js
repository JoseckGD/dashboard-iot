import { CardTipoUsuario } from '../components/CardTipoUsuario';
import '../styles/TipoUsuarioPage.css';
import icon from '../img/user.png';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/Header';

export const TipoUsuarioPage = () => {
   return (
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
   )
}