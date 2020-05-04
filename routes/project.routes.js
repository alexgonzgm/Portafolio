//Aqui tendremos todas las rutas del controlador projects
var express = require('express');
var router = express.Router();
var projectController = require('../controlles/project.controller');

var connectMultiparty = require('connect-multiparty');
var middlewareConnectMultiparty = connectMultiparty({ uploadDir: './uploads' })

//***** Rutas *****//
router.post("/project", projectController.saveProject);
router.get("/project/:id", projectController.getProject);
router.get("/projects", projectController.getProjects);
router.put("/project/:id", projectController.updateProject);
router.delete("/project/:id", projectController.deleteProject);
router.post("/uploadImage/:id", middlewareConnectMultiparty, projectController.uploadImage);
router.get("/image/:image", projectController.getImage);

//exportamos las rutas del controlador project hacia app.js
//donde esta la configuracion general
module.exports = router;