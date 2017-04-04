"use strict";
module.exports = dateInput;

function dateInput() {
  return {
    restrict: "AE",
    require: "?ngModel",
    link: link
  };
}

function link( scope, element, attrs, ngModelCtrl ) {
  $( function() {
    $( element ).datepicker( {
      dateFormat: "mm/dd/yy",
      minDate: 0,
      onSelect: function( date ) {
        scope.$apply( function() {
          ngModelCtrl.$setViewValue( moment( date ).format( "MM/DD/YYYY" ) );
        } );
      }
    } ).keydown( function( e ) {
      if ( e.which !== 9 ) {
        e.preventDefault();
      }
    } );
  } );

  ngModelCtrl.$formatters.push( function( val ) {
    if ( val ) {
      return moment( val ).format( "MM/DD/YYYY" );
    }
  } );
}
