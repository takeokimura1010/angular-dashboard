"use strict";

module.exports = stateChange;

function stateChange( $auth, $localStorage, $sessionStorage, Notifications, $state, $http ) {
  return function( event, toState ) {
    if ( $auth.isAuthenticated() ) {
      avoidLoginScreen( event, toState );
      headerOdoo();
      logoutFromAnotherPlace( event );
    } else {
      if ( $localStorage.user ) {
        loginByRemember( event );
      } else {
        withoutLogin( event, toState );
      }
    }
  };

  //it's logged in and wants to go to login site
  function avoidLoginScreen( event, toState ) {
    if ( toState.name === "login" ) {
      index( event );
    }
  }

  //It's logged and the default head values are set
  function headerOdoo() {
    if ( $sessionStorage.user ) {
      $http.defaults.headers.common.odooSession = $sessionStorage.user.sesionOdoo;
    }
  }

  //it has credentials in session, but not in local, it's logged out.
  function logoutFromAnotherPlace( event ) {
    if ( !$localStorage.user && !$sessionStorage.user ) {
      event.preventDefault();
      $auth.logout();
      delete $sessionStorage.user;
      Notifications.addCustom( 400, "You have logged out from another place" );
      $state.go( "login" );
    }
  }

  /*it has credentials in localStorage, but not in session,
   then credentials are loadeded into session */
  function loginByRemember( event ) {
    $sessionStorage.user = $localStorage.user;
    $auth.setToken( $sessionStorage.user.token );
    index( event );
  }

  //it's not logged in at all, and wants to see a resource that requires login
  function withoutLogin( event, toState ) {
    if ( !toState.free ) {
      event.preventDefault();
      Notifications.addCustom( 400,
         "You need to be logged in to see these resources" );
      $state.go( "login" );
    }
  }

  function index( event ) {
    event.preventDefault();
    $state.go( "index.clients" );
  }
}
