const con = require('../models/conexion.js');

const callback = (err, rows, resolve, reject, msg) => {
  if (err) { console.log(err); return reject(err) };
  if (msg) console.log(msg)
  return resolve(rows);
}

module.exports = {
  methods: {
    selectUser: function () {
      return new Promise((resolve, reject) => {
        con.query('SELECT id_usuario, nombre, numero_telefono, correo, rol FROM usuario', (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })
    },

    deleteUser: function (id) {
      return new Promise((resolve, reject) => {
        con.query(`DELETE FROM usuario WHERE id_usuario = ${id}`, (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })
    },

    updateUser: function (data) {
      return new Promise((resolve, reject) => {
        con.query(`UPDATE usuario SET nombre='${data.nombre}', numero_telefono='${data.numero_telefono}', correo='${data.correo}', rol='${data.rol}' WHERE id_usuario=${data.id_usuario}`, (err, rows) => {
          callback(err, rows, resolve, reject)
        });
      });
    },

    insertUser: async function (data) {


      let res = await new Promise((resolve, reject) => {
        con.query(`SELECT *FROM usuario WHERE correo ='${data.correo}'`, (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })

      if (res.rows.length == 0) {

        return new Promise((resolve, reject) => {
          con.query(`INSERT INTO usuario (nombre, numero_telefono, contrasena, correo, rol) VALUES ( '${data.nombre}', '${data.numero_telefono}', '${data.contrasena}', '${data.correo}', '${data.rol}')`, (err, rows) => {
            callback(err, rows, resolve, reject)
          })
        })

      } else {
        return new Promise((resolve, reject) => {
          return resolve("El correo ya existe en la Base de Datos")
        })
      }


    }
  }
}

//INSERT INTO usuario (id_usuario, nombre, numero_telefono, contrasena, correo, rol) VALUES (1, 'use01', '7727384123', '1234', 'email@email.com', 'Operador')