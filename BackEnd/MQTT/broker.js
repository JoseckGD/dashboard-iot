const mosca = require('mosca')
const express = require('express')
const path = require('path');


const app = express();


const mqtt = new mosca.Server({
  interfaces: [
    { type: "mqtt", port: 8081 },
    { type: "http", port: 8082, bundle: true }
  ]
})

mqtt.on('clientConnected', (client) => {
  console.log('New Client', client.id)
})

mqtt.on('published', (package, client) => {
  // console.log(package.payload.toString())
  package.payload.toString()
})

mqtt.on('ready', () => {
  console.log('Mosca Broker Listo')
})

app.use('/mqtt-client', express.static(path.dirname(require.resolve('mosca')) + '/public'));