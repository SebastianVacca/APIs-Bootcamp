var usuariosModel = {}

const mongoose = require("mongoose")
const Schema = mongoose.Schema

var usuariosSchema = new Schema({
    nombre: String,
    apellidos: String,
    direccion: String,
    telefono: Number,
    email: String,
    password: String
})

const users = mongoose.model("usuarios", usuariosSchema)


usuariosModel.Guardar = function(payload, callback){

    const instancia = new users
    instancia.nombre = payload.nombre
    instancia.apellidos = payload.apellidos
    instancia. direccion = payload.direccion
    instancia.telefono =  payload.telefono
    instancia.email = payload.email
    instancia.password = payload.password   

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback ({state: true, mensaje: "registro exitoso"})
    })
    
    
}

usuariosModel.Actualizar = function (payload, callback){
    var posicion = database.findIndex((item) => item.email == payload.email && item.password == payload.password)
    return callback(posicion)
}

usuariosModel.actualizaclave = function(payload, callback){
    database[payload.posicion].password = payload.nuevaclave
    return callback ({ state: true, mensaje: "usuario actualizado" })
}

usuariosModel.listarTodos = function(payload, callback){ 
    return callback(database)
}

usuariosModel.buscarEmail = function(payload,callback){
    var posicion = database.findIndex((item) => item.email == payload.email)
    return callback(posicion)
}
usuariosModel.Borrar = function (payload, callback){
    database.splice(payload.posicion, 1)
    return callback ({ state: true, mensaje: "Usuario eliminado" })
}

usuariosModel.filtro = function (payload, callback){
    var listarEmail = database.find((item) => item.email == payload.email)
    return callback(listarEmail)
}

usuariosModel.cargarformulario = function(payload, callback){
    var busqueda = database.find((item) => (item.email) === payload.email)
    return callback (busqueda)
}



module.exports.usuariosModel = usuariosModel