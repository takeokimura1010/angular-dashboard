"use strict";
module.exports = cisMonthpicker;

cisMonthpicker.$inject = [ ];
function cisMonthpicker( ) {
  return {
    restrict: "AE",
    require: "ngModel",
    replace: true,
    scope: {},
    templateUrl: "base/views/cisMonthpicker.html",
    link: link
  };
  function link( $scope, $elem, $attrs, ngModelCtrl ) {
    $scope.today = moment();
    $scope.year = year;
    $scope.open = open;
    $scope.disableMonth = disableMonth;
    $scope.activeMonth = activeMonth;
    $scope.moveYear = moveYear;
    $scope.setDate = setDate;
    $scope.hidden = true;
    $scope.showBackButton = showBackButton;

    $scope.$watch( function() {
      return ngModelCtrl.$viewValue;
    }, function( val ) {
      $scope.model = val;
    } );

    function moveYear( val ) {
      var newDate = moment( $scope.model, "YYYY-MM-DD" ).add( val, "years" );
      if ( newDate.year() >= $scope.today.year() ) {
        $scope.model = newDate.format( "YYYY-MM-DD" );
        $scope.months = months( $scope.model );
      }
    }

    function year() {
      return moment( $scope.model, "YYYY-MM-DD" ).format( "YYYY" );
    }

    function months( startDate ) {
      var point = moment( startDate ).startOf( "year" );
      var data = [];
      var length = 12;
      for ( var i = 0; i < length; i += 1 ) {
        data.push( moment( point ).add( i, "months" ) );
      }
      return data;
    }

    function disableMonth( month ) {
      return month.isBefore( moment( $scope.today ).startOf( "month" ) );
    }

    function activeMonth( month ) {
      return month.month() === moment( $scope.model, "YYYY-MM-DD" ).month();
    }

    function setDate( month ) {
      ngModelCtrl.$setViewValue( month.format( "YYYY-MM-DD" ) );
      $scope.model = ngModelCtrl.$viewValue;
      $scope.hidden = true;
    }

    function open() {
      if ( $scope.hidden ) {
        if ( ngModelCtrl.$viewValue ) {
          $scope.model = ngModelCtrl.$viewValue;
        } else {
          $scope.model = moment( $scope.today )
          .format( "YYYY-MM-DD" );
        }
        $scope.months = months( $scope.model );
        $scope.hidden = false;
      } else {
        $scope.hidden = true;
      }
    }

    function showBackButton() {
      var lastYear = moment( $scope.model, "YYYY-MM-DD" )
      .subtract( 1, "years" ).year();
      var currentYear = $scope.today.year();
      return lastYear >= currentYear;
    }

  }
}
