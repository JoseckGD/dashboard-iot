import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, Text } from 'recharts';
import { CustomTooltip } from './CustomTooltip'

let mqtt = require('mqtt/dist/mqtt')
let client = mqtt.connect('ws://192.168.1.75:8082/mqtt')

export const GraphPotenciometro = () => {

  const [value, setValue] = useState([]);

  useEffect(() => {

    client.on('connect', () => {
      console.log("FrontEnd Conectado al Broker MQTT")
      client.subscribe('device/temp')
    })

    client.on('message', (topic, message) => {
      console.log("Datos del ESP8266", message.toString())

      let date = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
      let hour = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

      setValue([...value, { name: date, uv: (message.toString()).split('#')[1], pv: 2400, amt: 10, hour: hour }])
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
            value="Valor Potenciometro"
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