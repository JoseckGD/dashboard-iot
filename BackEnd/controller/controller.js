const _model = require('../models/dispositivos_iot.js');
const _model_auth = require('../models/auth_model.js');

const session = require('express-session');

module.exports = {
  selectdevices: (req, res) => {

    _model.methods.selectAll()
      .then(rows => {
        res.send({
          success: true,
          message: 'Los datos han sido obtenidos',
          result: rows.rows,
        })
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error al obtener los datos',
          result: err
        })
      })
  },

  deletedevice: (req, res) => {

    let id = req.params.id;
    _model.methods.deleteDevice(id)
      .then(rows => {
        res.send({
          success: true,
          message: 'Se elimino correctamente el registro'
        })
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error al eliminar el registro',
          result: err,
        })
      })
  },

  insetdevice: (req, res) => {
    let data = {
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      estado: req.body.estado,
      nombre_planta: req.body.nombre_planta,
      variable_medida: req.body.variable_medida
    }

    _model.methods.insertDevice(data)
      .then(rows => {
        res.send({
          success: true,
          message: 'Se ha insertado un nuevo dispositivo'
        });
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error al crear un nuevo dispositivo'
        });
      });
  },

  updatedevice: (req, res) => {
    console.log(req.params.id)
    let data = {
      id: req.params.id,
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      estado: req.body.estado,
      nombre_planta: req.body.nombre_planta,
      variable_medida: req.body.variable_medida
    }

    _model.methods.updateDevice(data)
      .then(rows => {
        res.send({
          success: true,
          message: 'Se ha actualizado un registro'
        })
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error al actualizar el registro'
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