import { Button } from './Button';
import { CSVLink } from "react-csv";

let arrayData = []

const prettyLink = {
  backgroundColor: 'cornflowerblue',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 2,
  padding: '0 40px',
  borderRadius: 100,
  color: 'black'
};

export default function CardDispositivosIoT({ nombrIoT, handleChange, value, dataIoTDB }) {

  arrayData.push(data)

  return (

    <div>
      <strong>{`Dispositivo: ${nombrIoT}`}</strong>
      <input type="date" name='fecha' id={`fecha-${nombrIoT}`} value={value.fecha} onChange={(e) => handleChange(e)} />

      {dataIoTDB &&
        <CSVLink data={dataIoTDB} style={prettyLink}>
          Generar Reporte
        </CSVLink>
      }

    </div>
  )
}