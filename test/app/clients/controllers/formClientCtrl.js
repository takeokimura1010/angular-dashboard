"use strict";

var _name = require( "../../../../package.json" ).name;

describe( "FormClientCtrl Test", function() {

  beforeEach( angular.mock.module( _name ) );

  describe( "Initial parameters", function() {
    it( "Should assign a value to the scope", angular.mock.inject( assignValue ) );
  } );

} );

function assignValue( $controller ) {
  var value = {name: "Test"};
  var ctrl = $controller( "FormClientCtrl", {client: value } );
  expect( ctrl.client.name ).toEqual( value.name );
}
