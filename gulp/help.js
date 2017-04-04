"use strict";

var fs = require( "fs" );
var Log = require( "log" );
var log = new Log( "info" );

module.exports = help;

function help() {

  var readme = fs.readFileSync( "README.md", "utf-8" );
  var startText = string( "INICIO" );
  var start = readme.indexOf( startText ) + startText.length;
  var end = readme.indexOf( string( "FIN" ) );
  log.info( readme.substring( start, end ) );
}

function string( text ) {
  return "[comment]: <> (COMANDOS:" + text + ")";
}
