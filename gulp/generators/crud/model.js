"use strict";

module.exports = NAME;

function NAME( name, $id ) {
  this.name = name || null;
  this.$id = $id;
}

NAME.loadObj = loadObj;

function loadObj( json ) {
  if ( json ) {
    if ( _.isArray( json ) ) {
      return _.map( json, function( elem ) {
        return instance( elem );
      } );
    } else {
      return instance( json );
    }
  }
}

function instance( json ) {
  return new NAME( json.name, json.$id );
}
