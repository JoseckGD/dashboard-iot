const {Pool} = require('pg')

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    port:'5400',
    password:'1234',
    database:'dashboardIot'
})

pool.connect((err)=>{
    if(err) {console.log("Error"); return err;}
    console.log('Conectado a la BD')
})

module.exports = pool;