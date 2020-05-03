//Conecxion con la base de datos MongoDb
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/portafoliodb",
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Conexion con la base de datos portafoliodb con éxtito");
}).catch(()=>{
    console.log("Conexion errónea");
})