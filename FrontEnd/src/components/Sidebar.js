import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { buttonsData } from '../data/SidebarDataBtns';

import '../styles/stylesComponents/Sidebar.css'

import userA from '../img/userAvatar.png'
import menu from '../img/menu.png'
import close from '../img/close.png';
import { Navlink } from './Navlink';

export const Sidebar = () => {

  const {
    activeMenu,
    handleCloseSideBar,
    rolUser } = useStateContext();

  return (
    <nav className={`Sidebar ${!activeMenu && 'close'} `}>
      <div className='icon-menu' onClick={handleCloseSideBar}>
        {activeMenu ?
          (
            <img src={close} alt='menu' />
          ) : (
            <img src={menu} alt='menu' />
          )}
      </div>
      {
        buttonsData.map((item, index) =>
        (
          <>
            {(localStorage.getItem('authRol') === "Operador") ?
              <div key={item.title} className={`category ${item.title} num${index}`}>
                <p className='title'>
                  {index === 0 && (
                    <img src={userA} className='img-logo' alt='logo' />)
                  }
                </p>
                {item.btn.map((btn) => (
                  index === 0 ?


                    <p key={btn.name}>{rolUser}</p>
                    :

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
              < div key={item.title} className={`category ${item.title} num${index}`}>
                <p className='title'>
                  {index === 0 && (
                    <img src={userA} className='img-logo' alt='logo' />)
                  }
                  {/* {index !== 0 &&
                        item.title} */}
                </p>
                {item.btn.map((btn) => (
                  index === 0 ?
                    <p key={btn.name}>{rolUser}</p>
                    :
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
    </nav >
  )
}