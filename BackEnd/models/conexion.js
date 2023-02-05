const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  password: '1234',
  database: 'dashboardIot'
})

pool.connect((err) => {
  if (err) { console.log("Error al conectar con la base de datos", err); return err; }
  console.log('Conectado a la BD')
})

module.exports = pool;