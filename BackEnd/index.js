const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./config/routes.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mqtt = require('./MQTT/broker')

const port = 5051

const app = express();
app.use(cookieParser());

app.use(session({
  secret: 'incio sesion',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

//Para poder leer el json retornado por una petición
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes);

app.listen(process.env.PORT || port, () => {
  console.log(`Escuchando desde el puerto: ${port}`)
})