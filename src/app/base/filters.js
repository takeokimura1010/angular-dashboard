"use strict";

exports.date = date;
exports.percentage = percentage;
exports.month = month;

function date() {
  var dateFormat = "YYYY-MM-DD";
  return filter;

  function filter( date, displayFormat ) {
    if ( date ) {
      return moment( date, dateFormat ).format( displayFormat );
    } else {
      return "";
    }

  }
}

percentage.$inject = [ "$filter" ];

function percentage( $filter ) {
  return filter;
  function filter( num, decimals ) {
    if ( isNumber( num ) ) {
      return $filter( "number" )( num * 100, decimals || 2 ) + "%";
    }
    return "Undefined";
  }

  function isNumber( n ) {
    return !isNaN( parseFloat( n ) ) && isFinite( n );
  }
}

function month() {
  return function monthInner( num ) {
    return moment().month( num ).format( "MMM" );
  };
}
