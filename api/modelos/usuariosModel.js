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


usuariosModel.Guardar = function (payload, callback) {

    const instancia = new users
    instancia.nombre = payload.nombre
    instancia.apellidos = payload.apellidos
    instancia.direccion = payload.direccion
    instancia.telefono = payload.telefono
    instancia.email = payload.email
    instancia.password = payload.password

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true, mensaje: "registro exitoso" })
    }).catch((error) => {
        return callback({ state: false, mensaje: error })
    })


}

usuariosModel.Actualizar = function (payload, callback) {
    users.findOneAndUpdate({ email: payload.email }, {
        password: payload.nuevaclave
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true, mensaje: "usuario actualizado" })
    }).catch((error) => {
        return callback({ state: false, mensaje: error })
    })
    // database[payload.posicion].password = payload.nuevaclave
    // // var posicion = database.findIndex((item) => item.email == payload.email && item.password == payload.password)
    // return callback ({ state: true, mensaje: "usuario actualizado" })
}

usuariosModel.listarTodos = function (payload, callback) {
    users.find({}, {}).then((res) => {
        return callback({ state: true, datos: res })
    }).catch((error) => {
        return callback({ state: false, mensaje: error })
    })
}

usuariosModel.buscarEmail = function (payload, callback) {
    users.find({ email: payload.email }, { email: 1 }).then((res) => {
        return callback(res)
    }).catch((error) => {
        return callback({ state: false, mensaje: error })
    })
}
usuariosModel.Borrar = function (payload, callback) {

    users.findOneAndDelete({ email: payload.email }).then((res) => {
        console.log(res)
        return callback({ state: true, mensaje: "Usuario eliminado" })
    }).catch((error) => {
        return callback({ state: false, error: error })
    })
}

usuariosModel.filtro = function (payload, callback) {

    users.find({ email: payload.email }, { email: 1, nombre: 1, apellidos: 1 }).then((res) => {
        if (res == 0) {
            return callback({ state: false, mensaje: "no existe en la base de datos" })

        } else {
            return callback({ state: true, datos: res })
        }
    }).catch((error) => {
        return callback({ state: false, mensaje: error.message })
    })

}

usuariosModel.cargarformulario = function (payload, callback) {
    var busqueda = database.find((item) => (item.email) === payload.email)
    return callback(busqueda)
}



module.exports.usuariosModel = usuariosModel