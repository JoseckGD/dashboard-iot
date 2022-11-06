import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import './Toggle.css';

let mqtt = require('mqtt/dist/mqtt')
let client = mqtt.connect('ws://192.168.1.75:8082/mqtt')

export const Toggle = () => {

  const [value, setValue] = useState(1)

  useEffect(() => {
    client.publish('device/led', value.toString())
  }, [value])

  const handleBtn = (e) => {
    if (value == 0) {
      setValue(1)
    } else {
      setValue(0)
    }
  }

  return (
    <div className="togle-led">
      <div className={value == 1 ? 'toggle' : 'toggle is-active'}>
        <div className="circulo" onClick={(e) => handleBtn(e)}></div>
      </div >
    </div >
  )
}