const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    password: '1234',
    database: 'dashboardiot'
})

pool.connect((err) => {
    if (err) { console.log("Error"); return err; }
    console.log('Conectado a la BD')
})

module.exports = pool;