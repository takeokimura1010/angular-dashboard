"use strict";

module.exports = Customer;

function Customer( firstName, email, token, isClient, $id ) {
  this.firstName = firstName || null;
  this.email = email;
  this.token = token;
  this.isClient = isClient;
  this.$id = $id;
}

Customer.loadObj = loadObj;

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
  return new Customer( json.firstName, json.email, json.token, json.isClient, json.$id );
}
