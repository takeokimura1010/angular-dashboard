"use strict";

module.exports = NavigationCtrl;

NavigationCtrl.$inject = [ "$state", "$localStorage", "Notifications", "$auth",
 "$sessionStorage", "$translate" ];
function NavigationCtrl( $state, $localStorage, Notifications,
   $auth, $sessionStorage, $translate ) {
  var nav = this;
  nav.logout = logout;
  nav.today = moment();
  nav.getTitle = getTitle;
  nav.icon = icon;
  nav.user = $sessionStorage.user;
  nav.states = filterUnwantedStates( $state.get() );

  function logout() {
    $auth.logout()
      .then( function() {
        delete $sessionStorage.user;
        delete $localStorage.user;
        Notifications.addCustom( 200, "Successfully logged out" );
        $state.go( "login" );
      } );
  }

  function getTitle() {
    if ( $state.current.data && $state.current.data.title ) {
      return $translate.instant( $state.current.data.title );
    } else {
      return "Error";
    }
  }

  function icon() {
    if ( $state.current.data && $state.current.data.icon ) {
      return $state.current.data.icon;
    } else {
      return "fa-home";
    }
  }

  function filterUnwantedStates( states ) {
    var filteredStates = filterStatesByCredentials( states );
    return _.reject( filteredStates, function( state ) {
      return state.abstract || state.name === "login" ||
       state.name === "404" || state.name === "403" ||
       state.data.hidden ||
       state.name.match( /-one((\.\w*)?)$/ ) ||
       state.name.match( /^(\w*\.\w*)\..*$/ );
    } );
  }

  function filterStatesByCredentials( states ) {
    var p = $auth.getPayload().permissions;
    if ( p && all( p.user ) && all( p.role ) ) {
      return _.reject( states, function( state ) {
        return state.name === "index.administration";
      } );
    }
    return states;
  }

  function all( permissions ) {
    return _.every( _.values( permissions ), function( value ) {
      return !value;
    } );
  }
}
