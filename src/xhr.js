/**
 *
 * XHR
 *
 */

import $ from "jquery";
import localforage from "localforage";

//Geolocation
function geolocate() {
  var key = "AIzaSyAKe8E6r1mwROQ54x6NkMEWpO9ZGB41Rwg";
  var url = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key;
  if (!navigator.geolocation) {
    googleapis(url);
  } else {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      function (data) {
        successLocation(data, 1);
      },
      function (err) {
        googleapis(url);
      },
      options
    );
  }
}
//successLocation
async function successLocation(pos, type) {
  var crd = type === 1 ? pos.coords : pos.location;
  var latitude = type === 1 ? crd.latitude : crd.lat;
  var longitude = type === 1 ? crd.longitude : crd.lng;

  localforage.setItem("latitude", latitude);
  localforage.setItem("longitude", longitude);
}
//googleapis
function googleapis(url) {
  $.post(url)
    .done(function (data) {
      successLocation(data);
    })
    .fail(googleapisErro);
}
//googleapisErro
function googleapisErro(err) {
  console.error("Error al obtener el codigo postal", err);
}

export default {
  async ajax(params) {
    var that = this;
    const Usuario = await localforage.getItem("Usuario");
    var access_token = Usuario ? Usuario.access_token : "";

    geolocate();

    var defaults = {
      SERVER_URL: "http://test.ocsi.mx/Extranet/Services/WebApi_OneWallet/",
      async: true,
      crossDomain: true,
      url: "",
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      loading: true,
      //"timeout": 10000,
      error: true,
      access_token: access_token,
      data: [],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "bearer ",
        "Cache-Control": "no-cache",
      },
      beforeSend: function (jqXHR, settings) {
        jqXHR.setRequestHeader("Authorization", "bearer " + access_token);
        if (settings.loading) {
          app.loading(true);
        }
      },
      success: function () {},
    };

    var extendParams = $.extend({}, defaults, params);

    extendParams.url = extendParams.SERVER_URL + extendParams.path;
    extendParams.headers.Authorization = "bearer " + extendParams.access_token;
    extendParams.data.Latitude = await localforage.getItem("latitude");
    extendParams.data.Length = await localforage.getItem("longitude");

    try {
      if (window.Connection) {
        window.extendParams = extendParams;
        return $.ajax(extendParams)
          .fail(function (error, textstatus, message) {
            if (textstatus === "timeout") {
              alert(
                "Se agoto el tiempo de espera.Por favor vuelve a intentarlo."
              );
              app.loading(false);
            } else {
              if (extendParams.error) {
                switch (error.status) {
                  //Error controlado
                  case 400:
                    let mensajeError = that.getErrorMessage(error);
                    app.loading(false);
                    alert(mensajeError);
                    break;
                  //No autorizado
                  case 401:
                    alert("La sesión ha expirado.");
                    app.Exit();
                    break;
                  //No autorizado
                  case 404:
                    alert(
                      "Ocurrió un error inesperado, por favor inténtalo mas tarde."
                    );
                    app.View("main");
                    break;
                  default:
                    break;
                }
              }
            }
          })
          .always(function () {
            app.loading(false);
          });
      } else {
        alert("comprueba tu conexion y vuelve a intentarlo");
        app.loading(false);
      }
    } catch (e) {
      alert(e);
      app.loading(false);
    }
  },
  getErrorMessage(err) {
    var respuesta = err.responseJSON;
    try {
      if (typeof respuesta.Success !== "undefinded") {
        return respuesta.Message;
      } else if (respuesta.ModelState) {
        var Errores = respuesta.ModelState[""].join("\n");

        return Errores;
      } else {
        var mensajeError = respuesta.Message;
        mensajeError = JSON.parse(mensajeError);

        return (
          mensajeError.message ||
          mensajeError.Message ||
          mensajeError.errors.join("\n")
        );
      }
    } catch (e) {
      return "Error de Comunicaciones.";
    }
  },
};
