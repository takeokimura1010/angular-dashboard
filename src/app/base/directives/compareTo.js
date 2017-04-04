"use strict";

module.exports = compareTo;

function compareTo() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: link
  };
}

function link( scope, element, attributes, ngModel ) {
  ngModel.$validators.compareTo = function( modelValue ) {
    return modelValue === scope.otherModelValue;
  };
  scope.$watch( "otherModelValue", function() {
    ngModel.$validate();
  } );
}
