"use strict";

var _name = require( "../../../../package.json" ).name;

describe( "ListCustomerCtrl Test", function() {

  beforeEach( angular.mock.module( _name ) );

  describe( "Initial parameters", function() {
    it( "Should assign a value to the scope", angular.mock.inject( assignValue ) );
  } );

} );

function assignValue( $controller ) {
  var value = {docs: [], contador: 0};
  var ctrl = $controller( "ListCustomerCtrl", { list: value } );
  expect( ctrl.list.docs ).toEqual( value.docs );
  expect( ctrl.page ).toEqual( 1 );
  expect( ctrl.qty ).toEqual( 10 );
}
