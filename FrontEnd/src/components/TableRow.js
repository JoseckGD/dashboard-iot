import React from 'react'
import { Button } from './Button';
import homepage from '../img/homepage.png';
import { TableD } from './TableD';

export const TableRow = ({ title, el, eventoModify, eventoDelete }) => {

  return (
    <>
      {title === "usuarios" ?
        <tr key={el.id}>

          {Object.values(el).map((campo) => (

            <TableD key={`${el.id_usuario}_${campo}`} elemento={campo} />
          ))}

          <td className='td-modificar' data-id={el.id}>
            <Button
              evento={true}
              eventoModify={eventoModify}
              data={el}
              id_data={el.id}
              text='Modificar' icon={homepage}
              bgColor={'#00C851'}
              title={title}
            />
          </td>

          <td className='td-eliminar' data-id={el.id}>
            <Button
              evento={true}
              eventoDelete={eventoDelete}
              text='Eliminar'
              id_data={el.id}
              icon={homepage}
              bgColor={'#ff4444'}
              title={title}
            />
          </td>


        </tr>
        :
        undefined
      }

    </>
  )
}