var enviarmensaje = function (tipo, mensaje) {
  var alerta = document.getElementById("alerta")
  alerta.innerHTML = `<div class="alert alert-${tipo}" role="alert">
                        ${mensaje}
                      </div>`
}

var enviarmensajefiltro = function (tipo, mensaje) {
  var alerta = document.getElementById("alertafiltro")
  alerta.innerHTML = `<div class="alert alert-${tipo}" role="alert">
                        ${mensaje}
                      </div>`
}

var peticion = function (tipo, url, payload, callback) {

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var respuesta = JSON.parse(this.responseText);
      return callback(respuesta)
    }
  });

  xhr.open(tipo, url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(payload);
}

var guardar = function () {

  var nombre = document.getElementById("nombre").value
  var apellidos = document.getElementById("apellidos").value
  var direccion = document.getElementById("direccion").value
  var telefono = document.getElementById("telefono").value
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value


  var payload = "nombre=" + nombre + "&apellidos=" + apellidos + "&direccion=" + direccion + "&telefono=" + telefono + "&email=" + email + "&password=" + password + "";

  peticion("POST", "http://localhost:3001/usuarios/registrar", payload, function (respuesta) {
    if (respuesta.state == false) {
      enviarmensaje("danger", respuesta.mensaje)
    } else {
      enviarmensaje("success", respuesta.mensaje)
      limpiarformulario()
      listar()
      
    }

  })

}

var actualizar = function() {
  var nombre = document.getElementById("nombre").value
  var apellidos = document.getElementById("apellidos").value
  var direccion = document.getElementById("direccion").value
  var telefono = document.getElementById("telefono").value
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value


  var payload = "nombre=" + nombre + "&apellidos=" + apellidos + "&direccion=" + direccion + "&telefono=" + telefono + "&email=" + email + "&password=" + password + "";

  peticion("POST", "http://localhost:3001/usuarios/actualizar", payload, function (respuesta) {
    if (respuesta.state == false) {
      enviarmensaje("danger", respuesta.mensaje)
    } else {
      enviarmensaje("success", respuesta.mensaje)
      limpiarformulario()
      listar()
    }

  })
}

var listar = function () {
  var payload = "";

  peticion("POST", "http://localhost:3001/usuarios/listartodos", payload, function (respuesta) {

    var listarusurios = document.getElementById("tabla")
    listarusurios.innerHTML = ""

    for (let a = 0; a < respuesta.length; a++) {
      listarusurios.innerHTML += `<tr>
                            <th scope="row"> ${respuesta[a].email} </th>
                            <td> ${respuesta[a].nombre} </td>
                            <td> ${respuesta[a].apellidos} </td>
                            <td> ${respuesta[a].direccion} </td>
                            <td> ${respuesta[a].telefono} </td>
                            <td><button type="submit" class="btn btn-danger" onclick = borrar('${respuesta[a].email}')>Eliminar</button></td>
                            
                          </tr>`
    }


  })
}

var borrar = function (email) {
  var payload = "email=" + email ;
   console.log(payload)
  peticion("POST", "http://localhost:3001/usuarios/borrar", payload, function (respuesta) {
    if (respuesta.state == false) {
      enviarmensaje("danger", respuesta.mensaje)
    } else {
      enviarmensaje("success", respuesta.mensaje)
      listar()
    }

  })
}

var limpiarformulario = function () {

  document.getElementById("nombre").value = ""
  document.getElementById("apellidos").value = ""
  document.getElementById("direccion").value = ""
  document.getElementById("telefono").value = ""
  document.getElementById("email").value = ""
  document.getElementById("password").value = ""
}

var listaremail = function (email){

  var email = document.getElementById("peticionemail").value
  var payload = "email="+ email;

  peticion("POST", "http://localhost:3001/usuarios/listarporemail", payload, function (respuesta) {

  if (respuesta.state == false) {
    enviarmensajefiltro("danger", respuesta.mensaje)
  } else {

    var listarbusqueda = document.getElementById("tablapeticion")
    listarbusqueda.innerHTML = ""
    console.log(respuesta)
    
      listarbusqueda.innerHTML += `<tr>
                            <th scope="row" onclick = cargarformulario(${respuesta.email})> ${respuesta.email} </th>
                            <td onclick = cargarformulario(${respuesta.nombre})> ${respuesta.nombre} </td>
                            <td onclick = cargarformulario(${respuesta.apellidos})> ${respuesta.apellidos} </td>
                            <td onclick = cargarformulario(${respuesta.direccion})> ${respuesta.direccion} </td>
                            <td onclick = cargarformulario(${respuesta.telefono})> ${respuesta.telefono}'</td>
                          </tr>`
  }
  limpiarbusqueda()
  })
}

var limpiarbusqueda = function(){
  document.getElementById("peticionemail").value = ""
}

var cargarformulario = function(email){

  var payload = "email="+ email;
  peticion("POST", "http://localhost:3001/usuarios/cargarformulario", payload, function (respuesta) {
      console.log(respuesta)

      document.getElementById("nombre").value = respuesta.nombre
  document.getElementById("apellidos").value = respuesta.apellidos
  document.getElementById("direccion").value = respuesta.direccion
  document.getElementById("telefono").value = respuesta.telefono
  document.getElementById("email").value = respuesta.email
  document.getElementById("password").value = respuesta.password
  })

}

listar()
