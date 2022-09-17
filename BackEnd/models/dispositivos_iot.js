const con = require('../models/conexion.js');


const callback = (err, rows, resolve, reject, msg)=>{
    if(err){console.log(err); return reject(err)};
    if(msg)console.log(msg)
    return resolve(rows);
}

module.exports = {

    //Métodos del crud para la administración de dispositivos IoT
    methods:{
        selectAll:function(){
            return new Promise((resolve, reject)=>{
                con.query('SELECT *FROM dispositivos_iot', (err, rows)=>{
                    callback(err, rows, resolve, reject)
                })
            })
        },
        deleteDevice:function(id){
            return new Promise((resolve, reject)=>{
                con.query(`DELETE FROM dispositivos_iot WHERE id_dispositivo = ${id}`, (err, rows)=>{
                    callback(err, rows, resolve, reject)
                });
            })
        },
        insertDevice:function(data){
            return new Promise((resolve, reject)=>{
                con.query(`INSERT INTO dispositivos_iot (id_dispositivo, nombre, tipo, estado, dato_medida, nombre_planta) VALUES (default, '${data.nombre}', '${data.tipo}', '${data.estado}', '${data.variable_medida}', '${data.nombre_planta}')`, (err, rows)=>{
                    callback(err, rows, resolve, reject)
                })
            })
        },
        updateDevice:function(data){
            return new Promise((resolve, reject)=>{
                con.query(`UPDATE dispositivos_iot SET nombre = '${data.nombre}', tipo = '${data.tipo}', dato_medida = '${data.variable_medida}', nombre_planta = '${data.nombre_planta}' WHERE id_dispositivo = '${data.id}'`, (err, rows)=>{
                    callback(err, rows, resolve, reject)
                });
            });
        }
    }
}