
import { Formulario } from "../components/Formulario"
import { Table } from "../components/Table"

export const AdminUsuarios = () => {
  return (
    <>
      <Formulario
        inputs={['Nombre', 'Usuario', 'Rol', 'Password']}
      />
    </>
  )
}