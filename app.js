const express = require('express')
global.app = express()
global.config = require("./config.js").config

var bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", express.static(__dirname + "/frontEnd"))

global.database = []


require("./rutas.js")

app.listen(config.puerto, () => console.log("servidor corriendo por el puerto " + config.puerto))