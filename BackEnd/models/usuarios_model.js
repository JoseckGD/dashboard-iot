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
                con.query('SELECT id_usuario, nombre, numero_telefono, correo, rol FROM usuario', (err, rows)=>{
                    callback(err, rows, resolve, reject)
                })
            })
        },

        deleteUser:function(id){
            return new Promise((resolve, reject)=>{
                con.query(`DELETE FROM usuario WHERE id_usuario = ${id}` , (err, rows)=>{
                    callback(err, rows, resolve, reject)
                })
            })
        },
        
        updateUser:function(data){
            return new Promise((resolve, reject)=>{
                con.query(`UPDATE usuario SET nombre='${data.nombre}', numero_telefono='${data.numero_telefono}', contrasena='${data.contrasena}', correo='${data.correo}', rol='${data.rol}' WHERE id_usuario=${data.id_usuario}`, (err, rows)=>{
                    callback(err, rows, resolve, reject)
                });
            });
        }
    }
}