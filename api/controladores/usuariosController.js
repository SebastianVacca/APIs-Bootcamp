var usuariosController = {}
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel


usuariosController.Guardar = function (request, response) {
    var informacion = {
        nombre: request.body.nombre,
        apellidos: request.body.apellidos,
        direccion: request.body.direccion,
        telefono: request.body.telefono,
        email: request.body.email,
        password: request.body.password
    }

    if (informacion.nombre == null || informacion.nombre == undefined || informacion.nombre == "") {
        response.json({ state: false, mensaje: "El nombre es un campo obligatorio para poder registrarse" })
        return false
    }
    if (informacion.apellidos == null || informacion.apellidos == undefined || informacion.apellidos == "") {
        response.json({ state: false, mensaje: "El apellidos es un campo obligatorio para poder registrarse" })
        return false
    }

    if (informacion.email == null || informacion.email == undefined || informacion.email == "") {
        response.json({ state: false, mensaje: "El email es un campo obligatorio para poder registrarse" })
        return false
    }

    if (informacion.password == null || informacion.password == undefined || informacion.password == "") {
        response.json({ state: false, mensaje: "El password es un campo obligatorio para poder registrarse" })
        return false
    }

    usuariosModel.buscarEmail(informacion, function (posicion) {

        if (posicion.length == 0) {
            usuariosModel.Guardar(informacion, function (respuestamodelo) {
                response.json(respuestamodelo)
            })
        } else {
            response.json({ state: false, mensaje: " este correo ya se encuentra registrado" })
        }
    })
}

usuariosController.Actualizar = function (request, response) {
    var informacion = {
        email: request.body.email,
        password: request.body.password,
        nuevaclave: request.body.nuevaclave
    }

    if (informacion.email == null || informacion.email == undefined || informacion.email == "") {
        response.json({ state: false, mensaje: "Es necesario el email" })
        return false
    }
    if (informacion.password == null || informacion.password == undefined || informacion.password == "") {
        response.json({ state: false, mensaje: "Es necesario el password" })
        return false
    }
    if (informacion.nuevaclave == null || informacion.nuevaclave == undefined || informacion.nuevaclave == "") {
        response.json({ state: false, mensaje: "Es necesario asignar una nueva clave" })
        return false
    }

    usuariosModel.buscarEmail(informacion, function (posicion) {

        if (posicion.length == 0) {
            response.json({ state: false, mensaje: " datos incorrectos" })

        } else {
            usuariosModel.Actualizar(informacion, function (respuesta) {
                response.json(respuesta)
            })
        }
    })

}

usuariosController.listarTodos = function (request, response) {
    usuariosModel.listarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

usuariosController.Borrar = function (request, response) {
    var informacion = {
        email: request.body.email
    }

    if (informacion.email == null || informacion.email == undefined || informacion.email == "") {
        response.json({ state: false, mensaje: "El email es un campo obligatorio" })
        return false
    }

    usuariosModel.buscarEmail(informacion, function (posicion) {

        if (posicion.length == 0) {
            response.json({ state: false, mensaje: " datos incorrectos" })

        } else {
            usuariosModel.Borrar(informacion, function (respuesta) {
                response.json(respuesta)
            })
        }
    })


}

usuariosController.listarEmail = function (request, response) {
    var informacion = {
        email: request.body.email,
    }

    if (informacion.email == null || informacion.email == undefined || informacion.email == "") {
        response.json({ state: false, mensaje: "Es necesario el email" })
        return false
    }

    usuariosModel.filtro(informacion, function (respuesta) {
        console.log(respuesta)
        response.json(respuesta)
    })

}

// usuariosModel.buscarEmail(informacion, function (posicion) {
//     if (posicion == -1) {
//         response.json({ state: false, mensaje: "El email no está asociado a ningún usuario registrado" })
//         return false
//     } else {
//         informacion.posicion = posicion
//         usuariosModel.filtro(informacion, function (listarEmail) {
//             response.json(listarEmail)
//         })

//     }
// })

usuariosController.cargarformulario = function (request, response) {
    var informacion = {
        email: request.body.email,
    }

    if (informacion.email == null || informacion.email == undefined || informacion.email == "") {
        response.json({ state: false, mensaje: "Es necesario el email" })
        return false
    }

    usuariosModel.cargarformulario(informacion, function (respuesta) {
        response.json(respuesta)
    })
}



module.exports.usuariosController = usuariosController