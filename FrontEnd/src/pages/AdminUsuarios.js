
import { Formulario } from "../components/Formulario"

export const AdminUsuarios = () => {
  return (
    <>
      <Formulario
        inputs={['Nombre', 'Usuario', 'Rol', 'Password']}
      />
    </>
  )
}