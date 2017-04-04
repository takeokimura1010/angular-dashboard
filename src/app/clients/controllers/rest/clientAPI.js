"use strict";

module.exports = ClientAPI;

ClientAPI.$inject = [ "urlApi", "$firebaseArray", "$firebaseObject", "Notifications" ];

function ClientAPI( urlApi, $firebaseArray, $firebaseObject, Notifications ) {
  var ref = new Firebase( urlApi + "/Clients" );
  var rootRef = new Firebase( urlApi );
  ClientAPI.get = get;
  ClientAPI.listBy = listBy;
  ClientAPI.save = save;
  ClientAPI.remove = remove;
  ClientAPI.edit = edit;
  ClientAPI.list = list;
  ClientAPI.getSummary = getSummary;
  return ClientAPI;

  function get( idClient ) {
    return $firebaseObject( ref.child( idClient ) ).$loaded( function( resp ) {
      return resp;
    } );
  }

  function list() {
    return $firebaseArray( ref ).$loaded( function( resp ) {
      return resp;
    } );
  }

  function listBy( value, status ) {
    var listRef = ref.orderByChild( value ).equalTo( status );
    return $firebaseArray( listRef ).$loaded( function( resp ) {
      return resp;
    } );
  }

  function remove( obj ) {
    return ClientAPI.get( obj.$id ).then( function( resp ) {
      resp.$remove().then( ok, error );
    } );

    function ok( resp ) {
      Notifications.addCustom( 200, "Client deleted successfully" );
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
      Notifications.addCustom( 200, "Client created successfully" );
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
      Notifications.addCustom( 200, "Information saved successfully" );
      return resp.key();
    }

    function error( resp ) {
      Notifications.addCustom( 500, "There was a problem." );
      return resp;
    }
  }

  function getSummary( idClient ) {
    function getColection( branch ) {
      return rootRef.child( branch ).child( idClient )
      .once( "value", function( snapshot ) {
        return snapshot;
      } );
    }

    function groupByType( reports ) {
      var repGroups = { qty: 0 };
      _.forEach( reports, function( child ) {
        _.forEach( child, function( val, key ) {
          if ( !repGroups[key] ) { repGroups[key] = []; }
          var array = _.toArray( val );
          repGroups[key] = repGroups[key].concat( array );
          repGroups.qty += toArray.length;
        } );
      } );
      return repGroups;
    }

    function toArray( obj ) {
      var arr = [];
      _.forEach( obj, function( val, key ) {
        val.$id = key;
        arr.push( val );
      } );
      return arr;
    }

    return getColection( "Employee" ).then( function( employees ) {
      var data = {};
      data.employees = toArray( employees.val() );
      return getColection( "Customer" ).then( function( customers ) {
        data.customers = toArray( customers.val() );
        return getColection( "Incomplete" ).then( function( incompletes ) {
          data.incompleteReps = groupByType( incompletes.val() );
          return getColection( "Reports" ).then( function( completes ) {
            data.completeReps = groupByType( completes.val() );
            return data;
          } );
        } );
      } );
    } );
  }
}
