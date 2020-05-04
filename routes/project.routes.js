//Aqui tendremos todas las rutas del controlador projects
var express = require('express');
var router = express.Router();
var projectController = require('../controlles/project.controller');

//***** Rutas *****//
router.post("/project",projectController.saveProject);
router.get("/project",projectController.getProject);
router.get("/projects",projectController.getProject);
router.put("/project/:id",projectController.updateProject);
router.delete("/project/:id",projectController.deleteProject);

//exportamos las rutas del controlador project hacia app.js
//donde esta la configuracion general
module.exports = router;