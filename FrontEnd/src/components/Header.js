import '../styles/stylesComponents/Header.css';
import Logo from '../img/Logo.png';
// import homepage from '../img/homepage.png';
// import { Button } from './Button';
import { ToggleLightDark } from './ToggleLightDark';
import { NavLink } from 'react-router-dom';

export const Header = ({ btn }) => {
  return (
    <header>
      <NavLink to="/">
        <figure>
          <img src={Logo} alt="Logo" />
        </figure>
      </NavLink>

      <ToggleLightDark />
    </header>
  )
}
