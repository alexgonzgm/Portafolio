//Configuraciones para la conexion al servidor 
//Creacion de sistema de rutas 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Archivos de rutas de los distintos controladores 
var projectRoutes = require("./routes/project.routes");

//Middleware
app.use( bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Todas las rutas 
app.use('/api', projectRoutes)

///Exportacion del modulo hacia el index.js para crear el servidor 
module.exports = app;

