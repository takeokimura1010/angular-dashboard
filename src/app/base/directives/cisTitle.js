"use strict";

module.exports = title;

title.$inject = [ "$rootScope", "$timeout", "$translate" ];
function title( $rootScope, $timeout, $translate ) {
  return {
    restrict: "EA",
    scope: true,
    link: link
  };

  function link( scope, element ) {
    $rootScope.$on( "$stateChangeStart", change );

    function change( event, toState ) {
      var title = headliner( toState );
      $timeout( function() {
        element.text( title );
      } );
    }

    function headliner( toState ) {
      var title = $translate.instant( "title" );
      if ( toState.data && toState.data.title ) {
        return $translate.instant( toState.data.title ) + " | " + title;
      }
      return title;
    }
  }

}
