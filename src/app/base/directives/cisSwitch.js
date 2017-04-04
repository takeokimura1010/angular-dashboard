"use strict";

module.exports = cisSwitch;

function cisSwitch() {
  return {
    restrict: "EA",
    replace: true,
    templateUrl: "base/views/cisSwitch.html",
    require: "ngModel",
    scope: true,
    link: link
  };
}

function link( $scope, $elem, $attr, ngModelCtrl ) {
  $scope.id = uuid();
  $scope.type = $attr.type || null;
  $scope.value = false;
  $scope.apply = apply;

  $scope.$watch( function() {
    return $scope.$eval( $attr.ngDisabled );
  }, function( val ) {
    if ( val ) {
      $elem.addClass( "disabled" );
    } else {
      $elem.removeClass( "disabled" );
    }
  } );

  $scope.$watch( function() {
    return ngModelCtrl.$modelValue;
  }, function( val ) {
    if ( val ) {
      $scope.value = ngModelCtrl.$modelValue;
    } else {
      ngModelCtrl.$setViewValue( $scope.value );
    }
  } );

  function apply( val ) {
    ngModelCtrl.$setViewValue( val );
  }

}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( c ) {
    var r = Math.random() * 16 | 0,
      v = ( c === "x" ? r : ( r & 0x3 | 0x8 ) );
    return v.toString( 16 );
  } );
}
