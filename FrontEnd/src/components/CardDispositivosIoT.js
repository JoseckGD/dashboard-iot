import jsPDF from "jspdf";
import "jspdf-autotable";

const prettyLink = {
  backgroundColor: 'cornflowerblue',
  fontSize: 12,
  lineHeight: 2,
  padding: '5px 40px',
  border: 0,
  borderRadius: 100,
  color: 'black',
  fontWeight: 'bold'
};

export default function CardDispositivosIoT({ nombrIoT, handleChange, value, dataIoTDB, setDataBusqueda, setDataIoTDB }) {


  const createPDF = (e) => {

    setDataBusqueda({ iot: '', fecha: '' })
    setDataIoTDB(null)

    const doc = new jsPDF();

    let img = new Image()
    img.src = './Logo.png'
    doc.addImage(img, 'png', 14, 10, 20, 15)

    doc.text(`Dashboard IoT`, 38, 20);

    const tableColumn = ["Dispositivo", "Hora", "Dato", "Fecha"];
    const tableRows = [];

    dataIoTDB.forEach(data => {
      const DataIoT = [
        data.dispositivo_iot,
        data.hora,
        data.dato,
        data.fecha,
      ];
      tableRows.push(DataIoT);
    });


    doc.autoTable(tableColumn, tableRows, { startY: 45 });
    doc.text(`Reporte de Datos del Dispositivo "${nombrIoT}"`, 14, 40);
    doc.save(`reporte_${nombrIoT}.pdf`);
  }
  return (

    <div>
      <strong>{`Dispositivo: ${nombrIoT}`}</strong>
      <input type="date" name='fecha' id={`fecha-${nombrIoT}`} value={value.fecha} onChange={(e) => handleChange(e)} />

      {dataIoTDB &&
        dataIoTDB.length > 0 &&
        <button onClick={(e) => createPDF(e)} style={prettyLink}>Generar Reporte</button>
      }
    </div>
  )
}