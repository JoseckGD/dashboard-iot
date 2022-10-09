const con = require('../models/conexion.js');

const callback = (err, rows, resolve, reject, msg)=>{
    if(err){console.log(err); return reject(err)};
    if(msg)console.log(msg)
    return resolve(rows);
}

module.exports = {
    methods:{
        selectUser:function(){
            return new Promise((resolve, reject)=>{
                con.query('SELECT * FROM usuario', (err, rows)=>{
                    callback(err, rows, resolve, reject)
                })
            })
        }
    }
}