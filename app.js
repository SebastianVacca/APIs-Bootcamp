const express = require('express')
global.app = express()
global.config = require("./config.js").config

var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", express.static(__dirname + "/frontEnd"))
const mongoose = require("mongoose")


global.database = []


require("./rutas.js")
mongoose.connect("mongodb://127.0.0.1:27017/" + config.nombredb, {useNewUrlParser:true, useUnifiedTopology:true}).then((respuesta) => {
    console.log("conexión correcta a mongo")
})
   
app.listen(config.puerto, () => console.log("servidor corriendo por el puerto " + config.puerto))