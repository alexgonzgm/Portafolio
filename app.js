//Configuraciones para la conexion al servidor 
//Creacion de sistema de rutas 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use( bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
///Exportacion del modulo
module.exports = app;

