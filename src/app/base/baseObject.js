"use strict";

module.exports = baseObject;

function baseObject() {
}

baseObject.prototype.load = load;

function load( json ) {
  var that = this;
  if ( json ) {
    if ( _.isArray( json ) ) {
      return _.map( json, function( elem ) {
        return that.prototype.instantiate( elem );
      } );
    } else {
      return that.prototype.instantiate( json );
    }
  }
}
