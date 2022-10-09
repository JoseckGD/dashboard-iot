const _model = require('../models/usuarios_model.js');
const _model_auth = require('../models/auth_model.js');

const session = require('express-session');

module.exports = {
    selectusers: (req, res) => {

        _model.methods.selectUser()
          .then(rows => {
            res.send({
              success: true,
              message: 'Los usuarios han sido seleccionados exitosamente',
              result: rows.rows,
            })
          })
          .catch(err => {
            res.send({
              success: false,
              message: 'Error al obtener los usuarios',
              result: err
            })
          })
      },

      deleteuser: (req, res) => {

        let id = req.params.id;
        _model.methods.deleteUser(id)
          .then(rows => {
            res.send({
              success: true,
              message: 'El usuario ha sido eliminado exitosamente'
            })
          })
          .catch(err => {
            res.send({
              success: false,
              message: 'Error al eliminar el usuario',
              result: err,
            })
          })
      },

      selectuserauth: (req, res) => {
    let data = {
      nombre: req.body.user,
      contrasena: req.body.password,
    }

    console.log(data)
    _model_auth.methods.selectUser(data)
      .then(rows => {

        req.session.nombre = data.nombre;

        res.send({
          success: true,
          message: 'Usuario Autorizado'
        });
      })
      .catch(err => {

        delete req.session.nombre;

        res.send({
          success: false,
          message: 'Usuario o Contraseña Incorrectos'
        });
      })
  },

  selectuserauth: (req, res) => {
    let data = {
      nombre: req.body.user,
      contrasena: req.body.password,
    }

    console.log(data)
    _model_auth.methods.selectUser(data)
      .then(rows => {

        req.session.nombre = data.nombre;

        res.send({
          success: true,
          message: 'Usuario Autorizado'
        });
      })
      .catch(err => {

        delete req.session.nombre;

        res.send({
          success: false,
          message: 'Usuario o Contraseña Incorrectos'
        });
      })
  }
}