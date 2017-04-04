"use strict";

module.exports = futures;

function futures( $q, $timeout ) {
  futures.aFuture = aFuture;
  futures.aRejected = aRejected;
  return futures;

  function aFuture( value, timeout ) {
    return promise( "resolve", value, timeout );
  } //function

  function aRejected( value, timeout ) {
    return promise( "reject", value, timeout );
  } //function

  function promise( _type, value, timeout ) {
    try {
      var future = $q.defer();
      $timeout( function() {
        future[_type]( value );
      }, ( _.isUndefined( timeout ) ) ? 0 : timeout );
      return future.promise;
    } catch ( ex ) {
      return ex;
    } //catch
  } //function

}
