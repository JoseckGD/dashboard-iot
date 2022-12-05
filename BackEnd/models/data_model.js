const con = require('../models/conexion.js');


const callback = (err, rows, resolve, reject, msg) => {
  if (err) { console.log(err); return reject(err) };
  if (msg) console.log(msg)
  return resolve(rows);
}

module.exports = {

  methods: {
    selectAllData: function (data) {
      return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM datos Where dispositivo_iot = '${data.iot}'`, (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })
    },
    insertData: function (data) {

      return new Promise((resolve, reject) => {
        con.query(`INSERT INTO datos (dispositivo_iot, fecha, hora, dato) VALUES ('${data.iot}','${data.fecha}', '${data.hora}', '${data.dato}')`, (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })

    },
    selectDataWithDate: function (data) {
      return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM datos WHERE dispositivo_iot = '${data.iot}' and
        fecha = '${data.fecha}'`, (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })
    },
  }
}