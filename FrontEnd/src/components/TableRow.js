import React from 'react'
import { Button } from './Button';
import homepage from '../img/homepage.png';
import { TableD } from './TableD';

export const TableRow = ({ el, eventoModify }) => {

   return (
      <tr key={el.id_usuario}>
         {Object.values(el).map((campo) => (

            <TableD key={`${el.id_usuario}_${campo}`} elemento={campo} />

         ))}
         <td>
            <Button evento={true} eventoModify={eventoModify} dataUsuario={el} id_usuario={el.id_usuario} text='Modificar' icon={homepage} bgColor={'#00C851'} />
         </td>
         <td>
            <Button text='Eliminar' icon={homepage} bgColor={'#ff4444'} />
         </td>
      </tr>
   )
}