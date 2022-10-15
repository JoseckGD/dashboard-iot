import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from './Tooltip';
import defaultIcon from '../img/homepage.png';
import { useStateContext } from '../contexts/ContextProvider';

export const Navlink = ({ name, type, icon, index }) => {
   const { handleCloseSesion, setAuth } = useStateContext();

   return (
      <NavLink
         to={name === 'Home' ? '/' : `/${name.toLocaleLowerCase()}`}
         key={name}
         className={((navData) => (navData.isActive ?
            (`btn btn-${type} btn-active`)
            :
            (`btn btn-${type}`)
         ))
         }
         onClick={type === 'exit' && (handleCloseSesion, setAuth)}
      >
         {index !== 0 &&
            <div className='icon'>
               <img src={!icon ? defaultIcon : icon} alt={name} />
            </div>
         }
         <p>
            {name}
         </p>
         {index !== 0 &&
            <Tooltip text={name} />
         }

      </NavLink>
   )
}
