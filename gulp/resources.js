"use strict";
var gulp = require( "gulp" );
var routes = require( "./routes" );
var gutil = require( "gulp-util" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );

module.exports = resources;

function resources() {
  return gulp.src( routes.resources.main, {
      base: "./src"
    } )
    .pipe( plumber( {
      errorHandler: notify.onError( "Error: <%= error.message %>" )
    } ) )
    .pipe( gulp.dest( "dist/" ) )
    .on( "error", gutil.log );
}
