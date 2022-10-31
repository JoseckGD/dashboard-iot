import { dataTables } from '../data/DataTables'
import { TableHead } from './TableHead'
import '../styles/stylesComponents/Table.css'
import { useStateContext } from '../contexts/ContextProvider';
import Loader from './loader message/Loader';
import { TableRow } from './TableRow';

let indexT;
export const Table = ({ title, eventoModify, eventoDelete, data }) => {

   const { dbUser } = useStateContext();

   switch (title) {

      //Configuraciones para la Tabla Usuarios
      case "usuarios":

         data = dbUser;

         break;


      //Configuraciones para la tabla Dispositivos
      case "dispositivos":

         Object.prototype.rename_property = function (oldName, newName) {

            if (oldName === newName) {
               return this;
            }

            if (this.hasOwnProperty(oldName)) {
               this[newName] = this[oldName];
               delete this[oldName];
            }
            return this;
         };


         if (data !== null) {

            for (let dispositivo of data) {
               dispositivo.rename_property('id_dispositivo_iot', 'id');
               dispositivo.rename_property('nombre', 'Nombre');
               dispositivo.rename_property('tipo', 'Tipo');
               dispositivo.rename_property('estado', 'Estado');
               dispositivo.rename_property('dato_medida', 'Dato_medida');
            }
         }

         break;
      default:
         console.log('Sin opcion');
         break;
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
               {data && (
                  (data !== null) ? (
                     data.map((el) => (
                        < TableRow
                           key={title === 'usuarios' ? el.id_usuario : el.id}
                           title={title}
                           el={el}
                           eventoModify={eventoModify}
                           eventoDelete={eventoDelete}
                        />
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5">
                           <Loader />
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </div>
   )

}
