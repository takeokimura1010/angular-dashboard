"use strict";

//Using jasmine
//http://jasmine.github.io/2.3/introduction.html
describe( "Function should add 1 to the elements of an array", function() {
  it( "should add 1 to every element", increaseArray );
  it( "it should return an empty array when given an empty array", increaseArray2 );
  it( "it should return null when given null as parameter", increaseArray3 );
  it( "it should return undefined when given undefined as parameter", increaseArray4 );
  it( "should return undefined when given a non numerical array as parameter",
   increaseArray5 );
  it( "devolver undefined cuando recibe un objeto", increaseArray6 );
} );

var prueba = require( "../../../src/app/base/increaseArrays.js" );

function increaseArray() {
  var testData = [ 1, 2, 3 ];
  var expectedAnswer = [ 2, 3, 4 ];
  expect( prueba( testData ) ).toEqual( expectedAnswer );
}

function increaseArray2() {
  var testData = [];
  var expectedAnswer = [];
  expect( prueba( testData ) ).toEqual( expectedAnswer );
}

function increaseArray3() {
  var testData = null;
  var expectedAnswer = null;
  expect( prueba( testData ) ).toEqual( expectedAnswer );
}

function increaseArray4() {
  expect( prueba( undefined ) ).toEqual( undefined );
}

function increaseArray5() {
  var testData = [ "1", "asd", "asdddd" ];
  expect( prueba( testData ) ).toEqual( undefined );
}

function increaseArray6() {
  var testData = {hola: 1, otro: true};
  expect( prueba( testData ) ).toEqual( undefined );
}
