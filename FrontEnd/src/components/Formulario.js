
//Componente Formulario que requiere 3 props
//setActive <- Manipular el Estado del Componente padre este contrala la visibilidad del formulario
//inputs <- Es un arreglo con los datos para construir cada <input>
//handleSubmit <- La función que controlara el submit del formulario

export const Formulario = ({ setActive, inputs, handleSubmit }) => {

  const btnRegresar = (e) => {
    setActive(false)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form-crud" >
      {
        inputs &&
        inputs.map(input =>
          <div className={`input-container ${input.split(':')[0]}`}>
            {
              (input.split(':')[1] !== 'select') ?
                <input
                  type={input.split(':')[1]}
                  name={input.split(':')[0]}
                  placeholder={input.split(':')[0]}
                />
                :
                <select name={input.split(':')[0]} id="">
                  <option value="">-- {input.split(':')[0]} --</option>
                  <option value={input.split(':')[2]}>{input.split(':')[2]}</option>
                  <option value={input.split(':')[3]}>{input.split(':')[3]}</option>
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