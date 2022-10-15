import { dataTables } from '../data/DataTables'
import { TableHead } from './TableHead'
import '../styles/stylesComponents/Table.css'
import { useStateContext } from '../contexts/ContextProvider';
import Loader from './loader message/Loader';
import { TableRow } from './TableRow';

let indexT;
export const Table = ({ title }) => {
   dataTables.map((item, index) => (
      item.titleTable.includes(title) && (indexT = index)
   ));

   const {
      dbUser: data,
   } = useStateContext();

   return (
      <div className="tabla">
         <table>
            <caption>{dataTables[indexT].titleTable}</caption>
            <TableHead indexTable={indexT} />
            <tbody>
               {(data !== null) ? (
                  data.map((el) => (
                     <TableRow
                        key={el.id_usuario}
                        el={el}
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
