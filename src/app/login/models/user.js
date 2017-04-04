"use strict";

module.exports = User;

function User( name, photo, sessionOdoo, token, $id, email, state, role, permissions ) {
  this.name = name || null;
  this.photo = photo || null;
  this.sessionOdoo = sessionOdoo || null;
  this.token = token || null;
  this.$id = $id;
  this.email = email || null;
  this.state = state || null;
  this.role = role || null;
  this.permissions = permissions || {};
  this.elementsPerPage = 10;
}

User.loadObj = loadObj;

/*******************************************************  PUBLIC FUNCTIONS  */

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
  return new User( json.name, json.picture, json.sessionOdoo, json.token, json.$id, json.email,
    json.state, json.role, json.permissions );
}
