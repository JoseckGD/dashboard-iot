const con = require('./conexion.js');

const callback = (err, rows, resolve, reject, msg) => {
  if (err) { console.log(err); return reject(err) };
  if (msg) console.log(msg)
  return resolve(rows);
}

module.exports = {
  methods: {
    selectUser: async function (data) {

      let user = await new Promise((resolve, reject) => {
        con.query(`
        SELECT *FROM usuario WHERE correo = '${data.correo}' and contrasena = '${data.contrasena}'
        and rol = '${data.rol}'
        `, (err, rows) => {
          callback(err, rows, resolve, reject)
        })
      })

      if (user.rows.length !== 0) {
        return Promise.resolve(true)
      }

      return Promise.reject(false)
    }
  }
}