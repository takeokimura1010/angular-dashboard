"use strict";

module.exports = routes;

routes.$inject = [ "$stateProvider" ];
function routes( $stateProvider ) {

  $stateProvider.state( "index.MODULEFILE", {
    templateUrl: "MODULEFILE/views/index.html",
    url: "/MODULEFILE",
    controller: "MODULENAMECtrl",
    controllerAs: "mod",
    data: {
      title: "MODULENAME Module",
      icon: "fa-home",
      menu: "MODULENAME"
    }
  } );

}
