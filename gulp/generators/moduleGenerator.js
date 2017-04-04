"use strict";

var fs = require( "fs" );
var mkdirp = require( "mkdirp" );
var Log = require( "log" );
var log = new Log( "info" );

module.exports = generator;

function generator( cb ) {
  try {
    var file = require( "yargs" ).argv.name.toLowerCase();
    var moduleName = capitalize( file );
    var ars = files( moduleName, file );
    mkdirp( route( file, "./src/app/module/controllers" ), function() {
      fs.writeFile( route( file, "src/app/module/index.js" ), ars.index );
      fs.writeFile( route( file, "src/app/module/routes.js" ), ars.routes );
      fs.writeFile( route( file, "src/app/module/controllers/" +
       file + "Ctrl.js" ), ars.ctrl );
    } );
    mkdirp( route( file, "./src/app/module/views" ), function() {
      fs.writeFile( route( file, "src/app/module/views/index.html" ), ars.html );
    } );
    log.info( "Module generated." +
     "Remember to add the new module to src/app/index.js for it to be loaded" );
    cb();
  } catch ( es ) {
    log.error( es );
  }
}

function files( module, file ) {
  var index = fs.readFileSync( "gulp/generators/module/index.js", "utf-8" );
  var routes = fs.readFileSync( "gulp/generators/module/routes.js", "utf-8" );
  var ctrl = fs.readFileSync( "gulp/generators/module/ctrl.js", "utf-8" );
  var html = fs.readFileSync( "gulp/generators/module/index.html", "utf-8" );

  return {
    index: index.replace( /\bMODULENAME/g, module ).replace( /\bMODULEFILE/g, file ),
    routes: routes.replace( /\bMODULENAME/g, module ).replace( /\bMODULEFILE/g, file ),
    ctrl: ctrl.replace( /\bMODULENAME/g, module ).replace( /\bMODULEFILE/g, file ),
    html: html.replace( /\bMODULENAME/g, module ).replace( /\bMODULEFILE/g, file )
  };
}

function route( module, url ) {
  return url.replace( "module", module );
}

function capitalize( string ) {
  var lower = string.toLowerCase();
  return lower.charAt( 0 ).toUpperCase() + lower.slice( 1 );
}
