"use strict";

module.exports = listClientCtrl;

var setClientStatus = require( "../models/setStatus.js" ).setClientStatus;

listClientCtrl.$inject = [ "clients" ];
function listClientCtrl( clients ) {
  var vm = this;
  vm.filterOptions = [
    "All",
    "Paying",
    "Trial User",
    "Free User",
    "───────────────",
    "Deactivated"
  ];
  vm.filterBy = vm.filterOptions[1];
  vm.clients = setClientStatus( clients );
  vm.showClient = showClient;

  function showClient( client, criteria ) {
    if ( criteria === "All" ) {
      return true;
    }
    if ( client.status === criteria ) {
      return true;
    }
  }

  clients.$watch( function( event ) {
    if ( event === "child_added" ) {
      vm.clients = setClientStatus( clients );
    }
  } );
}
