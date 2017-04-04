"use strict";

module.exports = NAMEAPI;

var NAME = require( "../../models/FILE.js" );

NAMEAPI.$inject = [ "urlApi", "$firebaseArray", "$firebaseObject", "Notifications" ];

function NAMEAPI( urlApi, $firebaseArray, $firebaseObject, Notifications ) {
  var ref = new Firebase( urlApi + "/NAME" );
  NAMEAPI.get = get;
  NAMEAPI.list = list;
  NAMEAPI.save = save;
  NAMEAPI.remove = remove;
  return NAMEAPI;

  function get( id ) {
    if ( id ) {
      return $firebaseObject( ref.child( id ) ).$loaded( function( resp ) {
        return resp;
      } );
    } else {
      return new NAME();
    }
  }

  function list() {
    return $firebaseArray( ref ).$loaded( function( resp ) {
      return resp;
    } );
  }

  function remove( obj ) {
    return NAMEAPI.get( obj.$id ).then( function( resp ) {
      resp.$remove().then( ok, error );
    } );

    function ok( resp ) {
      Notifications.addCustom( 200, "Building deleted successfully" );
      return resp;
    }

    function error( resp ) {
      console.debug( resp );
      Notifications.addCustom( 500, "There was a problem." );
      return resp;
    }
  }

  function save( obj ) {
    if ( obj.$id ) {
      return edit( obj );
    } else {
      return create( obj );
    }
  }

  function create( obj ) {

    return $firebaseArray( ref ).$add( obj ).then( ok, error );

    function ok( resp ) {
      Notifications.addCustom( 200, "Building created successfully" );
      return resp.key();
    }

    function error( resp ) {
      Notifications.addCustom( 500, "There was a problem." );
      return resp;
    }
  }

  function edit( obj ) {
    return obj.$save().then( ok, error );
    function ok( resp ) {
      Notifications.addCustom( 200, "Building saved successfully" );
      return resp.key();
    }

    function error( resp ) {
      Notifications.addCustom( 500, "There was a problem." );
      return resp;
    }
  }
}
