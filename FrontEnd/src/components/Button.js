import { useStateContext } from '../contexts/ContextProvider';
import '../styles/stylesComponents/Button.css';

export const Button = ({ text, icon, bgColor, evento, eventoModify, id_data, data, eventoDelete }) => {

  const {
    setDataToEdit,
    // deleteData,
    // updateData,
    // dataToEdit,
  } = useStateContext();


  const openFormModify = () => {
    setDataToEdit(data);
    eventoModify(id_data);
  }


  const handleButton = (e, typeEvent) => {

    if (text === "Modificar") {
      openFormModify()
    } else if (text === "Eliminar") {
      eventoDelete(id_data)
    }
  }



  return (
    <button
      type="button"
      className='button'
      onClick={
        evento === true ? (
          // () => setDataToEdit(data)
          (e) => handleButton(e, text)

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
      {icon && <img src={icon} alt={text} />}

      {text}
    </button >
  )
}