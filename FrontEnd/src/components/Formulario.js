
//Componente Formulario que requiere 3 props
//setActive <- Manipular el Estado del Componente padre este contrala la visibilidad del formulario
//inputs <- Es un arreglo con los datos para construir cada <input>
//handleSubmit <- La función que controlara el submit del formulario

import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';


export const Formulario = ({ setActive, inputs, isAdd, initialForm, initialFormModify, to }) => {

  const [form, setForm] = useState(
    initialFormModify ?
      isAdd ? initialForm : initialFormModify
      : initialForm
  );

  const {
    createUser,
    // updateData,
    dataToEdit,
    setDataToEdit,
    createData,
    updateDevice
  } = useStateContext();

  useEffect(() => {
    if (dataToEdit) {

      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
    // eslint-disable-next-line
  }, [dataToEdit]);

  const handleChange = (e) => {
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const btnRegresar = (e) => {
    setActive(false);
    setDataToEdit(null);
    handleReset(e);
  }

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    switch (to) {
      case 'usuarios':
        if (form.id === null) {
          // alert('create');
          if (verifyFormData()) {
            createUser(form);
            setActive(false);
          }
          // createData(form);
          // alert(verifyFormData());
        } else {
          alert('update');
          // updateData(form);
          alert(form.id_usuario + 'a' + dataToEdit.rol);
          handleReset();
          setActive(false);
        }
        break;

      case 'dispositivos':
        if (form.id === null) {

          alert("Create")
          if (verifyFormData()) {
            form.id = "5"
            createData('http://localhost:5051/insertdevice', form);
          }

        } else {

          // alert(form.id_usuario + 'a' + dataToEdit.rol);
          alert("Modificar dispositivos")
          updateDevice(`http://localhost:5051/updatedevice/${5}`, form);
          handleReset();
        }

        setActive(false);
        break;
      default:
        console.log('Sin opcion');
        break;
    }

  };

  const verifyFormData = () => {

    switch (to) {

      case 'usuarios':
        if (!form.Nombre || !form.Telefono || !form.Correo || !form.Rol) {
          alert("Porfavor, llene los campos");
          return false;
        }
        break;

      case 'dispositivos':
        if (!form.Nombre || !form.Tipo || !form.Estado || !form.Dato_medida) {
          alert("Porfavor, llene los campos");
          return false;
        }
        break;
      default:
        console.log('Sin opcion');
        break;
    }

    return true;
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form-crud" >
      {
        inputs &&
        inputs.map((input, index) =>
          <div className={`input-container ${input.split(':')[0]}`} key={index}>
            {
              (input.split(':')[1] !== 'select') ?
                <input
                  type={input.split(':')[1]}
                  name={input.split(':')[0]}
                  placeholder={input.split(':')[0]}
                  onChange={handleChange}
                  value={
                    form.id === null ?
                      Object.values(form)[index]
                      :
                      Object.values(form)[index + 1]

                    // Object.keys(form).map((campo, index) => (
                    //   campo === input.split(':')[0] && Object.values(form)[index]
                    // ))
                  }
                />
                :
                <select defaultValue={dataToEdit !== null ? dataToEdit.Rol : form.Rol} name={input.split(':')[0]} id="" onChange={handleChange}>
                  <option value="" >-- {input.split(':')[0]} --</option>
                  <option value={input.split(':')[2]} >{input.split(':')[2]}</option>
                  <option value={input.split(':')[3]} >{input.split(':')[3]}</option>
                </select>
            }
          </div>


        )
      }

      <div className="btns-form">
        <button onClick={(e) => btnRegresar(e)}> <img src={require('../img/arrow-left.png')} alt="" /> Regresar</button>
        <button type='submit'>Guardar</button>
      </div>

    </form >
  )
}