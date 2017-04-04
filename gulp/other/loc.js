"use strict";

var gulp = require( "gulp" );
var sloc = require( "gulp-sloc" );
var routes = require( "../routes" );
var _ = require( "lodash" );

module.exports = scripts;

function scripts() {
  var all = [ routes.scripts.main ];
  all = _.union( routes.scripts.watch, [] );
  return gulp.src( all )
    .pipe( sloc() );
}
