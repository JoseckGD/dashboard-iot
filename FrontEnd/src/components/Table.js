import { dataTables } from '../data/DataTables'
import { TableHead } from './TableHead'
import '../styles/stylesComponents/Table.css'
import { useStateContext } from '../contexts/ContextProvider';
import Loader from './loader message/Loader';
import { TableRow } from './TableRow';

let indexT;
export const Table = ({ title, eventoModify }) => {

   const {
      dbUser: data,
   } = useStateContext();

   Object.prototype.rename_property = function (oldName, newName) {
      // no hacer nada si los nombre son iguales
      if (oldName == newName) {
         return this;
      }
      // Verificar si ya existe la propiedad con el nombre nuevo y evitar errores.
      if (this.hasOwnProperty(oldName)) {
         this[newName] = this[oldName];
         delete this[oldName];
      }
      return this;
   };

   // lo usas así... también podrías usar map, o un for común..
   // eso dependerá de la compatibilidad que necesites y lo
   // "modernizado" que quieras que sea tu código.
   if (data !== null) {

      for (var usuario of data) {
         usuario.rename_property('id_usuario', 'id');
         usuario.rename_property('nombre', 'Nombre');
         usuario.rename_property('numero_telefono', 'Telefono');
         usuario.rename_property('correo', 'Correo');
         usuario.rename_property('rol', 'Rol');
      }
   }

   dataTables.map((item, index) => (
      item.titleTable.includes(title) && (indexT = index)
   ));

   return (
      <div className="tabla">
         <table>
            <caption>{dataTables[indexT].titleTable}</caption>
            <TableHead indexTable={indexT} />
            <tbody>
               {(data !== null) ? (
                  data.map((el) => (
                     <TableRow
                        key={el.id}
                        el={el}
                        eventoModify={eventoModify}
                     />
                  ))
               ) : (
                  <tr>
                     <td colSpan="5">
                        <Loader />
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   )
}
