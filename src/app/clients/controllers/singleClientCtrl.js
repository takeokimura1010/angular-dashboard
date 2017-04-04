"use strict";

module.exports = singleClientCtrl;

singleClientCtrl.$inject = [ "client", "summary", "UserAPI", "EmailAPI", "Notifications" ];
function singleClientCtrl( client, summary, UserAPI, EmailAPI, Notifications ) {
  var vm = this;
  vm.editable = false;
  vm.client = client;
  vm.summary = summary;
  vm.details = getDetails( summary );
  vm.deactivate = deactivate;
  vm.activate = activate;
  vm.initDate = initDate;
  vm.saveDate = saveDate;
  vm.removeFree = removeFree;

  function initDate( date ) {
    if ( date ) {
      vm.freeCheck = true;
      vm.freeExpDate = date;
    }
  }

  function activate( client ) {
    function sendReactEmail() {
      EmailAPI.sendEmail( {
        type: "REACTIVATION",
        addresses: [ client.email ],
        subject: "Account Status",
        content: {}
      } );
    }
    if ( client.deactivated ) {
      UserAPI.activate( client ).then( sendReactEmail );
    } else {
      delete client.deactivationDate;
      client.$save().then( sendReactEmail );
    }
  }

  function deactivate( client ) {
    client.deactivationDate = moment().add( 7, "day" ).format( "YYYY-MM-DD" );
    client.$save().then( function() {
      EmailAPI.sendEmail( {
        type: "GRACE_PERIOD",
        addresses: [ client.email ],
        subject: "Account Status",
        content: {}
      } );
    } );
  }

  function saveDate( date ) {
    if ( date ) {
      vm.client.freeExpDate = moment( date ).format( "YYYY-MM-DD" );
      vm.client.$save().then( function() {
        Notifications.addCustom( 200, "User has been set as free" );
      } );
    }
  }

  function removeFree( check ) {
    if ( !check ) {
      delete vm.client.freeExpDate;
      vm.client.$save().then( function() {
        Notifications.addCustom( 200, "User free condition has been removed" );
      } );
    }
  }

  function getDetails( list ) {
    var table = {
      "Alarm": [],
      "Back Flow": [],
      "Emergency Exit": [],
      "Extinguisher": [],
      "Grease Cleaning": [],
      "Hood System": [],
      "Hydrant": [],
      "Monitoring": [],
      "Fire Pump": [],
      "Sensitivity": [],
      "Special Hazard": [],
      "Sprinkler": [],
      "Standpipe": [],
      "Suppression": []
    };
    _.forEach( table, function( rowVal, rowKey ) {
      var groupIncompletes = _.groupBy( list.incompleteReps[rowKey], "createdBy" );
      var groupCompletes = _.groupBy( list.completeReps[rowKey], "createdBy" );
      _.forEach( list.employees, function( employee ) {
        table[rowKey].push( {
          incQty: _.get( groupIncompletes[employee.$id], "length", 0 ),
          comQty: _.get( groupCompletes[employee.$id], "length", 0 )
        } );
      } );
    } );
    return table;
  }
}
