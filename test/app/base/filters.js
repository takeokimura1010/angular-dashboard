"use strict";

var _name = require( "../../../package.json" ).name;
describe( "base filters test", function() {

  beforeEach( angular.mock.module( _name ) );

  describe( "date filter", function() {
    it( "should instantiate a date from a YYYY-MM-DDTHH:mm:ss.sssZ formatted string",
     angular.mock.inject( stringDateFilter ) );
    it( "should instantiate a date from a date",
     angular.mock.inject( momentDateTest ) );
    it( "should return 'Invalid Date' from non date string",
     angular.mock.inject( stringDateBadFilter ) );
    it( "should return 'Invalid Date'from any non date value",
     angular.mock.inject( otherDateTest ) );

  } );

  describe( "percentage filter", function() {
    it( "should return a 2 decimals number, and the percentage sign",
      angular.mock.inject( testBasic ) );
    it( "should return a 2 decimals number, and the percentage sign when given a string",
        angular.mock.inject( testString ) );
    it( "should return 'Undefined' when given a string that includes a comma",
      angular.mock.inject( testString2 ) );
    it( "should return 'Undefined' when given null",
      angular.mock.inject( testNull ) );
    it( "should return 'Undefined' when given undefined",
      angular.mock.inject( undefinedTest ) );
    it( "should return 'Undefined' when given anything else",
      angular.mock.inject( otherTest ) );
  } );

} );

function stringDateFilter( $filter ) {
  var filter = $filter( "Date" );
  var param = "2014-10-10T07:43:22.000Z";
  var expected = moment( param, "YYYY-MM-DDTHH:mm:ss.sssZ" ).format( "HH:MM" );
  expect( filter( param, "HH:MM" ) ).toEqual( expected );
}

function momentDateTest( $filter ) {
  var filter = $filter( "Date" );
  var param = moment();
  var expected = param.format( "LL" );
  expect( filter( param, "LL" ) ).toEqual( expected );
}

function stringDateBadFilter( $filter ) {
  var filter = $filter( "Date" );
  var param = "non date string";
  var expected = "Invalid date";
  expect( filter( param, "LL" ) ).toEqual( expected );
}

function otherDateTest( $filter ) {
  var filter = $filter( "Date" );
  var expected = "Invalid date";
  expect( filter( {valor: 1}, "LL" ) ).toEqual( expected );
}

function testBasic( $filter ) {
  var filter = $filter( "Percentage" );
  var param = 0.2245;
  var expected = "22,45%";
  expect( filter( param ) ).toBe( expected );
}

function testString( $filter ) {
  var filter = $filter( "Percentage" );
  var param = "0.2245";
  var expected = "22,45%";
  expect( filter( param ) ).toBe( expected );
}
function testString2( $filter ) {
  var filter = $filter( "Percentage" );
  var param = "0,2245";
  var expected = "Undefined";
  expect( filter( param ) ).toBe( expected );
}
function testNull( $filter ) {
  var filter = $filter( "Percentage" );
  var expected = "Undefined";
  expect( filter( null ) ).toBe( expected );
}
function undefinedTest( $filter ) {
  var filter = $filter( "Percentage" );
  var expected = "Undefined";
  expect( filter( undefined ) ).toBe( expected );
}
function otherTest( $filter ) {
  var filter = $filter( "Percentage" );
  var expected = "Undefined";
  expect( filter( {} ) ).toBe( expected );
  expect( filter( true ) ).toBe( expected );
  expect( filter( "String" ) ).toBe( expected );
  expect( filter( [] ) ).toBe( expected );
}
