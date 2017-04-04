"use strict";

var gulp = require( "gulp" );
var minifyHTML = require( "gulp-minify-html" );
var ngTemplate = require( "gulp-angular-templatecache" );
var routes = require( "./routes" );
var gutil = require( "gulp-util" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );

var ngTemplateOpts = {
  module: require( "../package.json" ).name
};

exports.development = development;
exports.production = production;

function development() {
  var minifyOpts = {
    empty: true,
    spare: true,
    quotes: true,
    comments: true
  };
  return toCompile( minifyOpts );
}

function production() {
  var minifyOpts = {
    empty: false,
    spare: false,
    quotes: true,
    comments: false
  };
  return toCompile( minifyOpts );
}

function toCompile( minifyOpt ) {
  return gulp.src( routes.templates.watch )
    .pipe( plumber( {
      errorHandler: notify.onError( "Error: <%= error.message %>" )
    } ) )
    .pipe( minifyHTML( minifyOpt ) )
    .pipe( ngTemplate( "templates.js", ngTemplateOpts ) )
    .pipe( gulp.dest( "./dist/" ) )
    .on( "error", gutil.log );
}
