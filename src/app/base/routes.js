"use strict";

module.exports = routes;
routes.$inject = [ "$stateProvider", "$urlRouterProvider" ];

function routes( $stateProvider, $urlRouterProvider ) {

  $stateProvider.state( "index", {
    templateUrl: "base/views/template.html",
    abstract: true
  } );

  $stateProvider.state( "404", {
    url: "/404",
    templateUrl: "base/views/404.html",
    free: true,
    data: {
      title: "routes.base.404"
    }
  } );

  $stateProvider.state( "403", {
    url: "/403",
    templateUrl: "base/views/403.html",
    free: true,
    data: {
      title: "routes.base.403"
    }
  } );

  $urlRouterProvider.otherwise( "/" );
} //routes
