"use strict";

var _name = require( "../../../../package.json" ).name;

describe( "FormCustomerCtrl Test", function() {

  beforeEach( angular.mock.module( _name ) );

  describe( "Initial parameters", function() {
    it( "Should assign a value to the scope", angular.mock.inject( assignValue ) );
  } );

} );

function assignValue( $controller ) {
  var value = { fb: {} };
  var ctrl = $controller( "FormCustomerCtrl", {customer: value, dueInspections: [] } );
  expect( ctrl.customer.name ).toEqual( value.name );
}
