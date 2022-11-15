const _model = require('../models/dispositivos_iot.js');
const _model_auth = require('../models/auth_model.js');
const _model_data = require('../models/data_model.js');

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
      id: req.body.id,
      nombre: req.body.Nombre,
      tipo: req.body.Tipo,
      estado: req.body.Estado,
      variable_medida: req.body.Dato_medida
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
    let data = {
      id: req.params.id,
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      estado: req.body.estado,
      variable_medida: req.body.dato_medida
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
      contrasena: req.body.pass,
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

  insertdata: (req, res) => {
    // let data = {
    //   iot: req.body.iot,
    //   dato: req.body.dato,
    //   fecha: req.body.fecha,
    //   hora: req.body.hora,
    // }

    _model_data.methods.insertData(req.body)
      .then(rows => {
        res.send({
          success: true,
          message: 'Se ha insertado nuevos datos'
        });
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error al insertar datos'
        });
      });
  },

  selectdata: (req, res) => {
    let data = {
      iot: req.body.iot,
    }

    console.log(data)
    _model_data.methods.selectAllData(data)
      .then(rows => {
        res.send({
          success: true,
          message: 'Los datos iot han sido obtenidos',
          result: rows,
        })
      })
      .catch(err => {
        res.send({
          success: false,
          message: 'Error al obtener los datos iot',
          result: err
        })
      })
  }
}