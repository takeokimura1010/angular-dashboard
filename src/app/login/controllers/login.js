"use strict";

module.exports = LoginCtrl;

LoginCtrl.$inject = [
  "$auth",
  "Notifications",
  "$state",
  "$sessionStorage",
  "$localStorage",
  "UserAPI",
  "cfpLoadingBar" ];

function LoginCtrl( $auth, Notifications, $state, $sessionStorage, $localStorage, UserAPI,
  cfpLoadingBar ) {
  var vm = this;
  vm.login = login;
  vm.user = {
    remember: true
  };
  vm.reset = false;
  vm.submitEmail = submitEmail;

  function login( form, user ) {
    if ( form.$valid ) {
      var remember = !vm.user.remember ? "sessionOnly" : "default";
      cfpLoadingBar.start();
      UserAPI.login( user.login, user.password, remember )( result );
    } else {
      return Notifications.addCustom( 400, "Required information missing " );
    }
  }

  function submitEmail( form, email ) {
    if ( form.$valid ) {
      cfpLoadingBar.start();
      UserAPI.resetPassword( email ).then( closeLB, closeLB );
    }
  }

  function closeLB() {
    cfpLoadingBar.complete();
  }

  function result( error, data ) {
    if ( error ) {
      cfpLoadingBar.complete();
      Notifications.addCustom( 400, "Invalid Credentials" );
    } else {
      UserAPI.isAdmin( data.uid ).then( function( user ) {
        if ( user.exists() ) {
          var session = {
            token: data.token,
            email: vm.user.login
          };
          $sessionStorage.user = session;
          if ( vm.user.remember === true ) {
            $localStorage.user = session;
          }
          $state.go( "index.clients" ).then( function() {
            document.body.scrollTop = 0;
            cfpLoadingBar.complete();
          } );
        } else {
          $auth.logout().then( function() {
            $state.go( "login" );
            Notifications.addCustom( 400, "You don't have permission to access this site" );
            cfpLoadingBar.complete();
          } );
        }
      } );
    }
  }
}
