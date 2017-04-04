"use strict";

module.exports = routes;

routes.$inject = [ "$stateProvider" ];
function routes( $stateProvider ) {

  $stateProvider.state( "index.clients", {
    templateUrl: "clients/views/listClients.html",
    url: "/clients",
    controller: "ListClientCtrl",
    controllerAs: "vm",
    resolve: {
      clients: listClients
    },
    data: {
      title: "Find Company",
      icon: "fa-building",
      menu: "Find Company"
    }
  } );

  $stateProvider.state( "index.trials", {
    templateUrl: "clients/views/listTrials.html",
    url: "/trials",
    controller: "ListTrialCtrl",
    controllerAs: "vm",
    resolve: {
      trialUsers: listTrials
    },
    data: {
      title: "Trial Users",
      icon: "fa-users",
      menu: "Trial Users"
    }
  } );

  $stateProvider.state( "index.clients.single", {
    templateUrl: "clients/views/formClient.html",
    url: "/data/:idClient",
    controller: "SingleClientCtrl",
    controllerAs: "vm",
    resolve: {
      client: getClient,
      summary: getSummary
    },
    data: {
      title: "Client data"
    }
  } );

  listClients.$inject = [ "ClientAPI" ];
  function listClients( ClientAPI ) {
    return ClientAPI.list();
  }

  listTrials.$inject = [ "ClientAPI" ];
  function listTrials( ClientAPI ) {
    return ClientAPI.listBy( "trial", true );
  }

  getClient.$inject = [ "ClientAPI", "$stateParams" ];
  function getClient( ClientAPI, $stateParams ) {
    return ClientAPI.get( $stateParams.idClient ).then( function( client ) {
      if ( client.trial ) {
        client.remainingDays = require( "./models/setStatus.js" ).checkDate( client );
      }
      return client;
    } );
  }

  getSummary.$inject = [ "ClientAPI", "$stateParams", "cfpLoadingBar" ];
  function getSummary( ClientAPI, $stateParams, cfpLoadingBar ) {
    cfpLoadingBar.start();
    return ClientAPI.getSummary( $stateParams.idClient ).then( function( data ) {
      cfpLoadingBar.complete();
      return data;
    } );
  }
}
