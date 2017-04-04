"use strict";

var gulp = require( "gulp" );
var size = require( "gulp-size" );
var routes = require( "../routes" );
var notify = require( "gulp-notify" );
var _ = require( "lodash" );

module.exports = scripts;

function scripts() {
  var all = [ routes.scripts.main ];
  all = _.union( routes.less.watch, routes.scripts.watch, [] );
  var s = size( {showFiles: true} );
  return gulp.src( all )
    .pipe( s )
    .pipe( notify( {
      onLast: true,
      message: function() {
        return "Total size " + s.prettySize;
      }
    } ) );
}
