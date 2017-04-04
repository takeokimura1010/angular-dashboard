"use strict";

var _name = require( "../../../../package.json" ).name;

describe( "FormNAMECtrl Test", function() {

  beforeEach( angular.mock.module( _name ) );

  describe( "Initial parameters", function() {
    it( "Should assign a value to the scope", angular.mock.inject( assignValue ) );
    it( "Should be editing", angular.mock.inject( edit ) );
    it( "Shouldn't be editing", angular.mock.inject( read ) );
  } );

} );

function assignValue( $controller ) {
  var value = {name: "Test"};
  var ctrl = $controller( "FormNAMECtrl", {FILE: value } );
  expect( ctrl.FILE.name ).toEqual( value.name );
  expect( ctrl.FILE.editing ).toEqual( false );
}

function edit( $controller ) {
  var ctrl = $controller( "FormNAMECtrl", {FILE: {}, $stateParams: {edit: "true"}} );
  expect( ctrl.FILE.editing ).toEqual( true );
}

function read( $controller ) {
  var ctrl = $controller( "FormNAMECtrl", {FILE: {}, $stateParams: {edit: "false"}} );
  expect( ctrl.FILE.editing ).toEqual( false );
}
