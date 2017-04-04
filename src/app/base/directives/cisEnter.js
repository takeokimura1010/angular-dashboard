"use strict";

module.exports = cisEnter;

function cisEnter() {
  return function( scope, element, attrs ) {
    element.bind( "keydown keypress", function( event ) {
      if ( event.which === 13 || event.which === 32 || event.which === 188 ) {
        scope.$apply( function() {
          scope.$eval( attrs.cisEnter );
        } );
        event.preventDefault();
      }
    } );
  };
}
