
//Componente Formulario que requiere 3 props
//setActive <- Manipular el Estado del Componente padre este contrala la visibilidad del formulario
//inputs <- Es un arreglo con los datos para construir cada <input>
//handleSubmit <- La función que controlara el submit del formulario

import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const initialForm = {
  Nombre: "", //nombre:
  Telefono: "", //numero_telefono:
  Correo: "", //correo
  Rol: "", //rol
  id: null, //id_usuario
};

const initialFormAddUser = {
  Nombre: "", //nombre:
  Telefono: "", //numero_telefono:
  Correo: "", //correo
  Rol: "", //rol
  Contrasena: "", //rcontrasna
  RepeatContrasena: "", //repeat_contrasna
  id: null, //id_usuario
};

export const Formulario = ({ setActive, inputs, isAddUser }) => {

  const [form, setForm] = useState(isAddUser ? initialFormAddUser : initialForm);

  const {
    createUser,
    // updateData,
    dataToEdit,
    setDataToEdit,
  } = useStateContext();

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialFormAddUser);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
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
    setForm(initialFormAddUser);
    setDataToEdit(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id === null) {
      // alert('create');
      if (verifyFormData()) {
        createUser(form);
      }
      // createData(form);
      // alert(verifyFormData());
    } else {
      alert('update');
      // updateData(form);
      alert(form.id_usuario + 'a' + dataToEdit.rol);
      handleReset();
    }
    setActive(false);
  };

  const verifyFormData = () => {
    if (!form.Nombre || !form.Telefono || !form.Correo || !form.Rol) {
      alert("Porfavor, llene los campos");
      return false;
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