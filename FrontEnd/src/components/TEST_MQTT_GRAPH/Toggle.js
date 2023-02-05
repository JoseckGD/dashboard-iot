import { useEffect, useState } from "react";
import './Toggle.css';

let mqtt = require('mqtt/dist/mqtt')
// let client = mqtt.connect('ws://192.168.30.84:8082/mqtt', { clientId: `Fronted/Iot ${Math.random()}`, clean: false })
// let client = mqtt.connect('ws://192.168.87.92:8082/mqtt', { clientId: `Fronted/Iot ${Math.random()}`, clean: false })
let client = mqtt.connect('ws://192.168.0.95:8082/mqtt', { clientId: `Fronted/Iot ${Math.random()}`, clean: false })

export const Toggle = () => {

  const [value, setValue] = useState(1)

  useEffect(() => {
    client.publish('device/led', value.toString())
  }, [value])

  const handleBtn = (e) => {
    if (value === 0) {
      setValue(1)
    } else {
      setValue(0)
    }
  }

  return (
    <div className="togle-led">
      <div className={value === 1 ? 'toggle-2' : 'toggle-2 is-active'}>
        <div className="circulo" onClick={(e) => handleBtn(e)}></div>
      </div >
    </div >
  )
}