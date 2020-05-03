//Aqui tendremos todas las rutas del controlador projects
var express = require('express');
var router = express.Router();
var projectController = require('../controlles/project.controller');

//***** Rutas *****//
router.post("/project",projectController.saveProject);

//exportamos las rutas del controlador project hacia app.js
//donde esta la configuracion general
module.exports = router;