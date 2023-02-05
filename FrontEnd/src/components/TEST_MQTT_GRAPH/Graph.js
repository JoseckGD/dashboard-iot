import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { useStateContext } from '../../contexts/ContextProvider';
import { CustomTooltip } from './CustomTooltip'

const mqtt = require('mqtt/dist/mqtt')
// const client = mqtt.connect('ws://192.168.30.84:8082/mqtt', { clientId: `Fronted/Iot ${Math.random()}`, clean: false })
// const client = mqtt.connect('ws://192.168.87.92:8082/mqtt', { clientId: `Fronted/Iot ${Math.random()}`, clean: false })
const client = mqtt.connect('ws://192.168.0.95:8082/mqtt', { clientId: `Fronted/Iot ${Math.random()}`, clean: false })

export const Graph = ({ device }) => {

  const [value, setValue] = useState([]);
  // const [dataToSend, setDataToSend] = useState([]);
  const [deviceIsConnected, setDeviceIsConnected] = useState(false);

  const { insertDataIot, urlBase } = useStateContext();

  useEffect(() => {

    if (!deviceIsConnected) {

      client.on('connect', () => {
        setDeviceIsConnected(true);
        console.log("FrontEnd Conectado al Broker MQTT");
        // console.log(`device/${device}`)
        client.subscribe(`device/${device}`);
      })
    }

    client.on('message', (topic, message) => {
      if (topic === `device/${device}`) {
        // console.log("Datos del ESP8266", message.toString())
        let date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        let hour = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

        setValue([...value, { name: date, uv: (message.toString()).split('#')[1], pv: 2400, amt: 10, hour: hour }])


        // insertDataIot(`http://localhost:5051/insert_data`, {
        insertDataIot(`${urlBase}/insert_data`, {
          iot: device,
          fecha: date,
          hora: hour,
          dato: (message.toString()).split('#')[1],
        });
      }
    })

  })


  return (
    <ResponsiveContainer width={"100%"} height={300} min-width={300}>
      <LineChart width={600} height={300} data={value} margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 30,
      }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name">
          <Label
            value="Fecha"
            offset={0}
            position="insideBottom"
            dy={20}
            fill='rgb(205, 92, 92)'
            fontFamily='roboto'
          />
        </XAxis>

        <YAxis>
          <Label
            value={`Valor  ${device}`}
            offset={0}
            angle={-90}
            position="left"
            dy={-60}
            fill='rgb(205, 92, 92)'
            fontFamily='roboto'
          />
        </YAxis>

        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}