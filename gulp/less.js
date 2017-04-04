"use strict";
var gulp = require( "gulp" );
var less = require( "gulp-less" );
var rename = require( "gulp-rename" );
var path = require( "path" );
var gutil = require( "gulp-util" );
var sourcemaps = require( "gulp-sourcemaps" );
var browserSync = require( "browser-sync" );
var reload = browserSync.reload;
var routes = require( "./routes" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );
var CleanCSS = require( "less-plugin-clean-css" );
var AutoPrefix = require( "less-plugin-autoprefix" );

exports.development = development;
exports.production = production;

function development() {
  return compiler( false )
  .pipe( reload( {
    stream: true
  } ) );
}

function production() {
  return compiler( true );
}

function compiler( minify ) {
  return gulp.src( [ routes.less.main ] )
    .pipe( plumber( {
      errorHandler: notify.onError( "Error: <%= error.message %>" )
    } ) )
    .pipe( sourcemaps.init() )
    .pipe( lessc( minify ) )
    .pipe( sourcemaps.write( "." ) )
    .pipe( rename( "styles.css" ) )
    .pipe( gulp.dest( "dist/" ) )
    .on( "error", function( e ) {
      gutil.log( e );
      this.emit( "end" );
    } );
}

function lessc( minify ) {
  var plugins = [ new AutoPrefix( { browsers: [ "last 2 versions" ] } ) ];
  if ( minify ) {
    plugins.push( new CleanCSS( { advanced: true } ) );
  }
  return less( {
    paths: [ path.join( __dirname, "less", "includes" ) ],
    plugins: plugins
  } );
}
