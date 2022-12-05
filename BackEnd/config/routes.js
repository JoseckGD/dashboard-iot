const express = require('express')
const { selectdevices, deletedevice, insetdevice, updatedevice, selectuserauth, insertdata, selectdata, selectDataWithDate } = require('../controller/controller.js')
const { selectusers, deleteuser, updateuser, insertUser } = require('../controller/user_controller.js')
const Router = express.Router();
const session = require('express-session');


//RUTAS CRUD DISPOSITIVOS IOT
Router.get('/selectdevices', selectdevices);
Router.delete('/deletedevice/:id', deletedevice);
Router.post('/insertdevice', insetdevice);
Router.put('/updatedevice/:id', updatedevice);

Router.post('/selectuserauth', selectuserauth);

//RUTAS PARA OBTENRE E INSERTAR DATOS DE DISPOSITVOS IOT
Router.post('/insert_data', insertdata);
Router.post('/select_all_data/:iot', selectdata);
Router.post('/selectdevicewithdate', selectDataWithDate)


//RUTAS DE USUARIOS
Router.get('/selectusers', selectusers);
Router.delete('/deleteuser/:id', deleteuser);
Router.put('/updateuser/:id', updateuser);
Router.post('/insertuser', insertUser);

Router.get('/userauth', (req, res) => {
  if (req.session.nombre !== undefined) {
    console.log("Bienvenido", req.session.nombre)
    res.send({
      success: true,
      message: 'Usuario Autorizado'
    })
  } else {
    res.send({
      success: false,
      message: 'Usuario no Autorizado'
    });
  }
});

Router.get('/deleteusuerauth', (req, res) => {
  delete req.session.nombre;

  if (req.session.nombre === undefined) {
    res.send({
      success: true,
      message: 'La sesión se ha cerrado'
    });
  } else {
    res.send({
      success: false,
      message: 'Error al cerrar sesion'
    });
  }

})

module.exports = Router;
