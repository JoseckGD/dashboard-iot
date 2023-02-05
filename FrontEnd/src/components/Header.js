import '../styles/stylesComponents/Header.css';
import '../styles/stylesComponents/Sidebar.css'
import Logo from '../img/Logo.png';
// import homepage from '../img/homepage.png';
// import { Button } from './Button';
import { ToggleLightDark } from './ToggleLightDark';
import { NavLink } from 'react-router-dom';
import { buttonsData } from '../data/SidebarDataBtns';

import { useStateContext } from '../contexts/ContextProvider';

import userA from '../img/userAvatar.png'
import menu from '../img/menu.png'
import close from '../img/close.png';
import { Navlink } from './Navlink';

export const Header = ({ botones }) => {

  const {
    activeMenu,
    handleCloseSideBar,
    rolUser } = useStateContext();
  return (
    <header>
      <NavLink to="/">
        <figure>
          <img src={Logo} alt="Logo" />
        </figure>
      </NavLink>
      {
        botones !== false &&
        <nav className={`Sidebar`}>
          {
            buttonsData.map((item, index) =>
            (
              <>
                {(localStorage.getItem('authRol') === "Operador") ?
                  <div key={item.title} className={`${item.title} num${index}`}>
                    {/* <p className='title'>
                  {index === 0 && (
                    <img src={userA} className='img-logo' alt='logo' />)
                  }
                </p> */}
                    {item.btn.map((btn) => (
                      index > 0 &&
                      (btn.name !== "Dispositivos" && btn.name !== "Usuarios") &&
                      (<Navlink
                        name={btn.name}
                        type={btn.type}
                        icon={btn.icon}
                        index={index}
                        key={btn.name}
                      />)

                    ))}
                  </div>

                  :
                  < div key={item.title} className={` ${item.title} num${index}`}>
                    {/* <p className='title'>
                  {index === 0 && (
                    <img src={userA} className='img-logo' alt='logo' />)
                  }
                </p> */}
                    {item.btn.map((btn) => (
                      index > 0 &&
                      (<Navlink
                        name={btn.name}
                        type={btn.type}
                        icon={btn.icon}
                        index={index}
                        key={btn.name}
                      />)

                    ))}
                  </div>
                }
              </>
            ))
          }
        </nav>
      }
      <ToggleLightDark botones={botones} />
    </header>
  )
}
