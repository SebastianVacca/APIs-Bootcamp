// var peticion = function (tipo, url, payload, callback) {

//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
  
//     xhr.addEventListener("readystatechange", function () {
//       if (this.readyState === 4) {
//         var respuesta = JSON.parse(this.responseText);
//         return callback(respuesta)
//       }
//     });
  
//     xhr.open(tipo, url);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
//     xhr.send(payload);
//   }

// var listartodos = function(){
//     var payload = "";

//     peticion("POST", "http://localhost:3001/usuarios/listartodos", payload, function (respuesta) {
    
//     var listado = document.getElementById("usuariosRegistrados")

//     listado.innerHTML = ""
//     for (let a = 0; a < respuesta.informacion.length; a++) {
//         listado.innerHTML += `      <tr>
//                                 <th scope="row">${respuesta.informacion[a].nombre}</th>
//                                 <td>${respuesta.informacion[a].apellidos}</td>
//                                 <td>${respuesta.informacion[a].direccion}</td>
//                                 <td>${respuesta.informacion[a].telfono}</td>
//                                 <td>${respuesta.informacion[a].email}</td>
//                             </tr>`
            
//     }
//     })
// }

