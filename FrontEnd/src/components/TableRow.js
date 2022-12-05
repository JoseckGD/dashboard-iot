import { Button } from './Button';
import btn_modificar from '../img/boton-modifcar.png';
import btn_eliminar from '../img/boton-eliminar.png';
import { TableD } from './TableD';
let id = '';
export const TableRow = ({ title, el, eventoModify, eventoDelete }) => {

   // const [id, setId] = useState(null);

   title === 'dispositivos' && (id = el.id_dispositivo_iot);
   title === 'usuarios' && (id = el.id_usuario);
   // title === 'usuarios' && setId(el.id);

   return (
      <tr key={Math.random()}>

         {Object.values(el).map((campo, index) => (

            (typeof campo === 'boolean')
               ? <TableD key={`${id}_${campo}_${index}`} elemento={campo.toString()} />
               : <TableD key={`${id}_${campo}_${index}`} elemento={campo} />

         ))}

         <td className='td-modificar' data-id={id}>
            <Button
               key={`${id}_modificar`}
               evento={true}
               eventoModify={eventoModify}
               data={el}
               id_data={id}
               text='Modificar' icon={btn_modificar}
               bgColor={'#00C851'}
            />
         </td>

         <td className='td-eliminar' data-id={id}>
            <Button
               key={`${id}_eliminar`}
               evento={true}
               eventoDelete={eventoDelete}
               text='Eliminar'
               id_data={id}
               icon={btn_eliminar}
               bgColor={'#ff4444'}
            />
         </td>


      </tr>
   )
}