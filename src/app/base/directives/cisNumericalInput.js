"use strict";
module.exports = cisNumericalInput;
cisNumericalInput.$inject = [ "$filter" ];
function cisNumericalInput( $filter ) {
  return {
    require: "ngModel",
    restrict: "E",
    link: link( $filter )
  };
}

function link( $filter ) {
  return function( scope, element, attrs, ngModelCtrl ) {
    if ( attrs.type === "numerical" ) {
      ngModelCtrl.$parsers.push( function( val ) {
        var clean = val.replace( /[^0-9,\,]+/g, "" );
        if ( val !== clean ) {
          ngModelCtrl.$setViewValue( clean );
          ngModelCtrl.$render();
        }
        if ( clean === "" ) {
          clean = "0";
        }
        return parseFloat( clean.replace( ",", "." ) );
      } );
      ngModelCtrl.$formatters.push( function( val ) {
        var DecimalCount = String( val ).split( "." )[1];
        var decimals = 0;
        if ( DecimalCount ) {
          decimals = DecimalCount.length;
        }
        return $filter( "Number" )( val, decimals );
      } );

      element.bind( "keypress", function( event ) {
        if ( event.keyCode === 32 ) {
          event.preventDefault();
        }
      } );
    }
    return;
  };
}
