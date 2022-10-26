import { useStateContext } from '../contexts/ContextProvider';
import '../styles/stylesComponents/CardTipoUsuario.css';


export const CardTipoUsuario = ({ tipo, icono }) => {

   const { currentMode } = useStateContext();

   return (
      <div
         className="cardTipoUsuario"
         style={{
            boxShadow: `0px 8px 20px 0 ${currentMode === 'Light' ? '#000000' : '#ffffff'}50`,
         }}>
         <div className="imgIcon">
            <img src={icono} alt={tipo} />
         </div>
         <div className="txtTipo">
            <p>{tipo}</p>
         </div>
      </div>
   )
}
