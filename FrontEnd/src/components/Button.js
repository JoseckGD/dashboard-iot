import { useStateContext } from '../contexts/ContextProvider';
import '../styles/stylesComponents/Button.css';

export const Button = ({ text, icon, bgColor, evento, eventoModify, id_usuario, dataUsuario }) => {
   const {
      setDataToEdit,
      // deleteData,
      // updateData,
      // dataToEdit,
   } = useStateContext();


   const openFormModify = () => {
      setDataToEdit(dataUsuario);
      eventoModify(id_usuario);
   }

   return (
      <button
         type="button"
         className='button'
         onClick={
            evento === true ? (
               // () => setDataToEdit(dataUsuario)
               () => openFormModify()
            ) : (
               evento === false ? (
                  undefined
               ) : (evento)
            )
         }
         style={{
            backgroundColor: bgColor,
            boxShadow: `0px 5px 20px 1px ${bgColor}90`
         }}
      >
         <img src={icon} alt={text} />
         {text}
      </button >
   )
}