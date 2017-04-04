"use strict";

module.exports = routes;
routes.$inject = [ "$stateProvider" ];

function routes( $stateProvider ) {

  $stateProvider.state( "login", {
    url: "/",
    templateUrl: "login/views/login.html",
    controller: "LoginCtrl",
    controllerAs: "vm",
    free:  true
  } );

} //routes
