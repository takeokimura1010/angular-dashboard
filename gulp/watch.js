"use strict";

var gulp = require( "gulp" );
var routes = require( "./routes" );
var browserSync = require( "browser-sync" );
var reload = browserSync.reload;

module.exports = watch;

function watch() {
  gulp.watch( routes.scripts.watch, [ "js:hint", reload ] );
  gulp.watch( routes.less.watch, [ "build:less" ] );
  gulp.watch( routes.templates.watch, [ "build:html", reload ] );
  gulp.watch( routes.resources.main, [ "resources", reload ] );
}
