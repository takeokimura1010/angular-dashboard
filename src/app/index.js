/**
  Proyecto Base Ciris Informatic Solutions
  Enero 2015
  Recursos y lecturas
  Guia de estilo: https://github.com/johnpapa/angularjs-styleguide
  Otra guia de estilo: http://toddmotto.com/opinionated-angular-js-styleguide-for-teams/
  Sobre los controladores: http://toddmotto.com/rethinking-angular-js-controllers/
  Estilos Bootstrap: http://getbootstrap.com/css/
  Tema base de bootstrap: http://bootswatch.com/paper/
  notificaciones: https://github.com/Foxandxss/angular-toastr
*/
"use strict";
var _name = require( "../../package.json" ).name;
var prefix = "ciris-" + _name;
var lenguaje = "en";

//URL del backend en constante "urlApi"
var mod = angular.module( _name, [
  "ngAnimate",
  "ngMessages",
  "ngTouch",
  "ngStorage",
  "ngSanitize",
  "ui.router",
  "ui.bootstrap",
  "firebase",
  "toastr",
  "satellizer",
  "angular-loading-bar",
  "angularUtils.directives.uiBreadcrumbs",
  "pascalprecht.translate",
  "Backend",
  "angular.filter",
  require( "./base" ).name,
  require( "./login" ).name,
  require( "./main" ).name,
  require( "./clients" ).name
] );

mod.config( config );
mod.run( run );

config.$inject = [
  "$locationProvider",
  "$compileProvider",
  "toastrConfig",
  "$authProvider",
  "urlApi",
  "$localStorageProvider",
  "$sessionStorageProvider",
  "cfpLoadingBarProvider",
  "$translateProvider"
];

function config( $locationProvider, $compileProvider, toastrConfig, $authProvider, urlApi,
   $localStorageProvider, $sessionStorageProvider, cfpLoadingBarProvider, $translateProvider ) {
  html5Mode( true );
  $compileProvider.debugInfoEnabled( false );

  function html5Mode( mode ) {
    if ( window.history && window.history.pushState ) {
      $locationProvider.html5Mode( {
        enabled: mode,
        requireBase: false
      } );
    }
  } //html5Mode
  $localStorageProvider.setKeyPrefix( prefix + "-" );
  $sessionStorageProvider.setKeyPrefix( prefix + "-" );
  configureToastr( toastrConfig );
  configureSatellizer( $authProvider, urlApi );
  configureI18n( $translateProvider );
  require( "./base/configureLoadingBar.js" )( lenguaje, cfpLoadingBarProvider );
} //function

run.$inject = [ "$rootScope", "$auth", "$state", "Notifications", "$http", "$sessionStorage",
"$localStorage" ];

function run( $rootScope, $auth, $state, Notifications, $http, $sessionStorage, $localStorage ) {
  var parStateChange = require( "./stateChange.js" );
  var stateChange = parStateChange( $auth, $localStorage, $sessionStorage, Notifications, $state,
    $http );
  $rootScope.$on( "$stateChangeStart", stateChange );
  $rootScope.$on( "$stateChangeError", notFound );

  function notFound( event ) {
    event.preventDefault();
    $auth.logout().then( function() {
      delete $localStorage.user;
      Notifications.addCustom( 200, "There were some updates on your permissions.\n" +
      "Please, log in again." );
      $state.go( "login" );
    } );
  }
}

function configureSatellizer( $authProvider, url ) {
  $authProvider.storageType = "sessionStorage";
  $authProvider.loginUrl = url + "/api/login/odoo";
  $authProvider.baseUrl = url;
  $authProvider.tokenPrefix = prefix;
  $authProvider.google( {
    clientId: "738077328040-4opl3gua0qjr3a5jm015oa0rbid0lgoa.apps.googleusercontent.com",
    url: "/api/login/google"
  } );
  $authProvider.oauth1( {
    name: "odoo",
    url: "/api/login/odoo",
    redirectUri: window.location.origin || window.location.protocol +
     "//" + window.location.host + "/asfaltos"
  } );
}

function configureToastr( toastrConfig ) {
  angular.extend( toastrConfig, {
    autoDismiss: true,
    containerId: "toast-container",
    maxOpened: 0,
    newestOnTop: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: "body",
    allowHtml: true,
    closeButton: true,
    closeHtml: "<i class='fa fa-fw fa-times'></i>",
    extendedTimeOut: 25000,
    iconClasses: {
      error: "alert-danger",
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning"
    },
    messageClass: "toast-message",
    onHidden: null,
    onShown: null,
    onTap: null,
    progressBar: false,
    tapToDismiss: true,
    timeOut: 10000,
    titleClass: "toast-title",
    toastClass: "alert"
  } );
}

function configureI18n( $translateProvider ) {
  $translateProvider.useSanitizeValueStrategy( null );
  $translateProvider.translations( "en", require( "../resources/i18n/en-US.json" ) );
  $translateProvider.translations( "es", require( "../resources/i18n/es-CR.json" ) );
  moment.locale( lenguaje );
  $translateProvider.preferredLanguage( lenguaje );
}

module.exports = mod;

angular.element( document ).ready( function() {
  angular.bootstrap( document, [ mod.name ], {strictDi: true} );
} );
