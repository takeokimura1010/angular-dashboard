"use strict";

module.exports = function increaseArray( temp ) {
  if ( temp === null ) {
    return null;
  }
  if ( temp && _.isArray( temp ) && verifyNumbers( temp ) ) {
    return _.map( temp, function( n ) {
      return n + 1;
    } );
  }

};

function verifyNumbers( array ) {
  return _.every( array, function( n ) {
    return _.isNumber( n );
  } );
}
