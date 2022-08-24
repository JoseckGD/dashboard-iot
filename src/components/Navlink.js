import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip } from './Tooltip'

export const Navlink = ({ name, type, icon, index }) => {

   return (
      <NavLink
         to={name === 'Home' ? '/' : `/${name.toLocaleLowerCase()}`}
         key={name}
         className={((navData) => (navData.isActive ?
            (`btn btn-${type} btn-active`)
            :
            (`btn btn-${type}`)
         ))
         }>
         {index !== 0 &&
            <div className='icon'>
               <img src={icon} alt={name} />
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
