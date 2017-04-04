"use strict";

module.exports = listTrialCtrl;
var setTrialStatus = require( "../models/setStatus.js" ).setTrialStatus;

listTrialCtrl.$inject = [ "trialUsers" ];
function listTrialCtrl( trialUsers ) {
  var vm = this;
  vm.trialUsers = setTrialStatus( trialUsers );

  trialUsers.$watch( function( event ) {
    if ( event === "child_added" ) {
      vm.trialUsers = setTrialStatus( trialUsers );
    }
  } );
}
