import React from 'react'
import { TableD } from './TableD';

export const TableRow = ({ el }) => {
   // const {id_usuario}
   return (
      <tr key={el.id_usuario}>
         {Object.values(el).map((campo) => (

            <TableD key={`${el.id_usuario}_${campo}`} elemento={campo} />

         ))}
      </tr>
   )
}