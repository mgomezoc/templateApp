/**
 *
 * APP
 *
 */
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap4-fs-modal/dist/css/bootstrap-fs-modal.css";
import "./css/app.less";
import $ from "jquery";
import "bootstrap";
import Handlebars from "handlebars";
import Enumerable from "linq";
import localforage from "localforage";
import moment from "moment";
import FastClick from "fastclick";

window.$ = $;
window.jQuery = $;
window.localforage = localforage;
window.Enumerable = Enumerable;
window.Handlebars = Handlebars;
window.moment = moment;

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'template',
  version: 0.1,
  size: 4980736,
  storeName: 'dbTemplate',
});

window.app = {
  init: async function() {
    //Polyfill para eliminar retrasos de clics en los navegadores con IU táctiles
    FastClick.attach(document.body);

    //phonegap listener
    document.addEventListener("deviceready", this.deviceReady, false);

    //this.isAuthenticated();
  },
  deviceReady() {
    //agrega padding si es ios
    $("body").addClass(device.platform);
    //reemplaza notificaciones por nativo
    if (navigator.notification) {
      window.alert = function(message) {
        navigator.vibrate(100);
        navigator.notification.alert(message, null, "APP", 'OK');
      };
    }
  },
  async isAuthenticated() {
    var Usuario = await localforage.getItem('Usuario');
    //valida que exista el Usuario en la memoria del telefono y que este verificado    
  },
  View(view) {},
  Loading(display) {},
  Exit() {
    var _this = this;
    const Promesas = [
      localforage.removeItem('Usuario'),
    ];

    Promise.all(Promesas).then(function(result) {
      app.init();
    });
  },
}

app.init();
