import '../styles/Header.css';
import Logo from '../img/Logo.png';
import homepage from '../img/homepage.png';
import { Button } from './Button';
import { ToggleLightDark } from './ToggleLightDark';
import { NavLink } from 'react-router-dom';

export const Header = () => {
   return (
      <header>
         <NavLink to="/">
            <figure>
               <img src={Logo} alt="Logo" />
            </figure>
         </NavLink>

         <ToggleLightDark />

         <div className="btn-header">
            <Button text='Opcion 1' icon={homepage} bgColor={'#6495ed'} />
            <Button text='Opcion 2' icon={homepage} bgColor={'#EF5B5B'} />
         </div>
      </header>
   )
}
