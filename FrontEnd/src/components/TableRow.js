import React from 'react'
import { Button } from './Button';
import homepage from '../img/homepage.png';
import { TableD } from './TableD';

export const TableRow = ({ title, el, eventoModify, eventoDelete }) => {

  return (
    <tr key={Math.random()}>

      {Object.values(el).map((campo) => (

        (typeof campo === 'boolean')
          ? <TableD key={`${el.id}_${campo}`} elemento={campo.toString()} />
          : <TableD key={`${el.id}_${campo}`} elemento={campo} />

      ))}

      <td className='td-modificar' data-id={el.id}>
        <Button
          key={`${el.id}_modificar`}
          evento={true}
          eventoModify={eventoModify}
          data={el}
          id_data={el.id}
          text='Modificar' icon={homepage}
          bgColor={'#00C851'}
        />
      </td>

      <td className='td-eliminar' data-id={el.id}>
        <Button
          key={`${el.id}_eliminar`}
          evento={true}
          eventoDelete={eventoDelete}
          text='Eliminar'
          id_data={el.id}
          icon={homepage}
          bgColor={'#ff4444'}
        />
      </td>


    </tr>
  )
}