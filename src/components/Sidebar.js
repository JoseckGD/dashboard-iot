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
      handleCloseSideBar } = useStateContext();

   return (
      <nav className={`Sidebar ${!activeMenu && 'close'} `}>
         <div className='icon-menu' onClick={handleCloseSideBar}>
            {activeMenu ?
               (
                  <img src={menu} alt='menu' />
               ) : (
                  <img src={close} alt='menu' />

               )}
         </div>
         {
            buttonsData.map((item, index) =>
            (
               <div key={item.title} className={`category ${item.title} num${index}`}>
                  <p className='title'>
                     {index === 0 && (
                        <img src={userA} className='img-logo' alt='logo' />)
                     }
                     {/* {index !== 0 &&
                        item.title} */}
                  </p>
                  {item.btn.map((btn) => (
                     <Navlink
                        name={btn.name}
                        type={btn.type}
                        icon={btn.icon}
                        index={index}
                        key={btn.name}
                     />
                  ))}
               </div>
            ))
         }
      </nav >
   )
}
         // <NavLink
         //    to={btn.name === 'Home' ? '/' : `/${btn.name.toLocaleLowerCase()}`}
         //    key={btn.name}
         //    className={((navData) => (navData.isActive ?
         //       (`btn btn-${btn.type} btn-active `)
         //       :
         //       (`btn btn-${btn.type}`)
         //    ))
         //    }>
         //    {index !== 0 &&
         //       <div className='icon'>
         //          <img src={btn.icon} alt={btn.name} />
         //       </div>
         //    }
         //    <p>
         //       {btn.name}
         //    </p>
         //    {index !== 0 &&
         //       <Tooltip text={btn.name} />
         //    }

         // </NavLink>