//Conecxion con la base de datos MongoDb
var mongoose = require('mongoose');
var app = require("./app");
mongoose.connect("mongodb://localhost:27017/portafoliodb",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Conexion con la base de datos portafoliodb con éxtito");
    app.listen(3700,()=>{
        console.log('Conexion al servidor 3700 con éxito');
    })
}).catch(()=>{
    console.log("Conexion errónea");
})