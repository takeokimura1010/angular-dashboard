"use strict";

var gulp = require( "gulp" );
var complexity = require( "gulp-complexity" );
var routes = require( "../routes" );
var gutil = require( "gulp-util" );

module.exports = complex;

function complex() {
  return gulp.src( routes.scripts.watch )
    .pipe( complexity( {
      "breakOnErrors": false
    } ) )
    .on( "error", gutil.log );
}
