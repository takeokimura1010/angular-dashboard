"use strict";

var gulp = require( "gulp" );
var rimraf = require( "rimraf" );
var conf = require( "./config.js" );
require( "./qa/tasks.js" );
require( "./generators/tasks.js" );
require( "./other/tasks.js" );

gulp.task( "help", require( "./help.js" ) );

gulp.task( "clean", clean );
gulp.task( "resources", require( "./resources" ) );

gulp.task( "backend", conf );

gulp.task( "build:js", require( "./browserify" ).development );
gulp.task( "build:bower", require( "./bower" ).development );
gulp.task( "build:html", require( "./templates" ).development );
gulp.task( "build:less", require( "./less" ).development );
gulp.task( "build", [ "build:js", "build:bower", "build:html",
 "build:less", "resources", "backend" ], function( cb ) {
   return cb();
 } );

gulp.task( "dist:js", require( "./browserify" ).production );
gulp.task( "dist:bower", require( "./bower" ).production );
gulp.task( "dist:html", require( "./templates" ).production );
gulp.task( "dist:less", require( "./less" ).production );
gulp.task( "dist", [ "dist:js", "dist:bower", "dist:html",
 "dist:less", "resources", "backend" ], function( cb ) {
   return cb();
 } );

gulp.task( "watch:js", require( "./browserify" ).watch );
gulp.task( "watch", [ "watch:js" ], require( "./watch" ) );

gulp.task( "serve:dev", [ "clean", "build", "watch" ], require( "./server" ) );
gulp.task( "serve:dist", [ "clean", "dist" ], require( "./server" ) );

gulp.task( "serve", require( "./server" ) );
gulp.task( "default", [ "serve:dev" ] );

function clean( callback ) {
  rimraf.sync( "./dist" );
  rimraf.sync( "./size" );
  return callback();
}
