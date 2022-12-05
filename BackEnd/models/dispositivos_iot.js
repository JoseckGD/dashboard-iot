const con = require('../models/conexion.js');


const callback = (err, rows, resolve, reject, msg) => {
  if (err) { console.log(err); return reject(err) };
  if (msg) console.log(msg)
  return resolve(rows);
}

module.exports = {

  //Métodos del crud para la administración de dispositivos IoT
  methods: {
    selectAll: function () {
      return new Promise((resolve, reject) => {
        con.query('SELECT *FROM dispositivo_iot', (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })
    },
    deleteDevice: function (id) {
      return new Promise((resolve, reject) => {
        con.query(`DELETE FROM dispositivo_iot WHERE id_dispositivo_iot = ${id}`, (err, rows) => {
          callback(err, rows, resolve, reject)
        });
      })
    },
    insertDevice: async function (data) {



      let res = await new Promise((resolve, reject) => {
        con.query(`SELECT *FROM dispositivo_iot WHERE nombre = '${data.nombre}'`, (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })


      if (res.rows.length == 0) {
        return new Promise((resolve, reject) => {
          con.query(`INSERT INTO dispositivo_iot (id_dispositivo_iot, nombre, tipo, estado, dato_medida) VALUES (default, '${data.nombre}', '${data.tipo}', ${JSON.parse(data.estado.toLowerCase())}, '${data.variable_medida}')`, (err, rows) => {
            callback(err, rows, resolve, reject)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          return resolve("Un Dispositivo ya existe con el mismo nombre")
        })
      }



    },
    updateDevice: function (data) {
      return new Promise((resolve, reject) => {
        con.query(`UPDATE dispositivo_iot SET nombre = '${data.nombre}', tipo = '${data.tipo}', dato_medida = '${data.variable_medida}' WHERE id_dispositivo_iot = '${data.id}'`, (err, rows) => {
          callback(err, rows, resolve, reject)
        });
      });
    }
  }
}