var usuariosController = require("./api/controladores/usuariosController.js").usuariosController


app.post("/usuarios/registrar", function (request, response) {
    usuariosController.Guardar(request, response)
})

app.post("/usuarios/actualizar", function (request, response) {
    usuariosController.Actualizar(request, response)
})

app.post("/usuarios/listartodos", function (request, response) {
    usuariosController.listarTodos(request, response)
})

app.post("/usuarios/borrar", function (request, response) {
    usuariosController.Borrar(request, response)
})

app.post("/usuarios/listarporemail", function (request, response) {
    usuariosController.listarEmail(request, response)
})

app.post("/usuarios/cargarformulario", function (request, response) {
    usuariosController.cargarformulario(request, response)
})
