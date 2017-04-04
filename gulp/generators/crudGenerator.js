"use strict";

var fs = require( "fs" );
var mkdirp = require( "mkdirp" );
var Log = require( "log" );
var log = new Log( "info" );

module.exports = generator;

function tests( name, module, file, ars ) {
  mkdirp( route( module, "./test/app/module/controllers" ), function() {
    fs.writeFile( route( module, "test/app/module/controllers/form" +
     name + "Ctrl.js" ), ars.formCtrlTest );
    fs.writeFile( route( module, "test/app/module/controllers/list" +
     name + "Ctrl.js" ), ars.listCtrlTest );
  } );
}

function normal( name, module, file, ars ) {
  mkdirp( route( module, "./src/app/module/models" ), function() {
    fs.writeFile( route( module, "src/app/module/models/" + file + ".js" ), ars.model );
  } );
  mkdirp( route( module, "./src/app/module/controllers/rest" ), function() {
    fs.writeFile( route( module, "src/app/module/controllers/rest/" +
     file + "API.js" ), ars.rest );
  } );
  fs.writeFile( route( module, "src/app/module/views/list" + name + ".html" ), ars.list );
  fs.writeFile( route( module, "src/app/module/views/form" + name + ".html" ), ars.one );
  fs.writeFile( route( module, "src/app/module/controllers/list" +
   name + "Ctrl.js" ), ars.listCtrl );
  fs.writeFile( route( module, "src/app/module/controllers/form" +
   name + "Ctrl.js" ), ars.formCtrl );

  fs.writeFile( route( module, "src/app/module/routes.js" ), addRoutes( module, ars.routes ) );
  fs.writeFile( route( module, "src/app/module/index.js" ),
   addAngular( module, ars.angular ) );
}

function generator( cb ) {
  try {
    var name = capitalize( require( "yargs" ).argv.name );
    var module = require( "yargs" ).argv.module.toLowerCase();
    var file = name.toLowerCase();
    var ars = files( name, file, module );

    normal( name, module, file, ars );
    tests( name, module, file, ars );

    log.info( "CRUD generated." );
    cb();
  } catch ( es ) {
    log.error( es );
  }
}

function addRoutes( module, routes ) {
  var currentRoutes = fs.readFileSync( route( module, "./src/app/module/routes.js" ), "utf-8" );
  var temp = currentRoutes.substring( 0, currentRoutes.lastIndexOf( "}" ) );
  return temp + "\n\n" + routes + "\n\n}";
}

function addAngular( module, angular ) {
  var currentIndex = fs.readFileSync( route( module, "./src/app/module/index.js" ), "utf-8" );
  var temp = currentIndex.substring( 0, currentIndex.lastIndexOf( "module.exports = mod;" ) );
  return temp + "\n\n" + angular + "\n\nmodule.exports = mod;";
}

function files( name, file, module ) {
  var model = fs.readFileSync( "gulp/generators/crud/model.js", "utf-8" );
  var rest = fs.readFileSync( "gulp/generators/crud/rest.js", "utf-8" );
  var list = fs.readFileSync( "gulp/generators/crud/list.html", "utf-8" );
  var one = fs.readFileSync( "gulp/generators/crud/one.html", "utf-8" );
  var listCtrl = fs.readFileSync( "gulp/generators/crud/listCtrl.js", "utf-8" );
  var formCtrl = fs.readFileSync( "gulp/generators/crud/formCtrl.js", "utf-8" );
  var routes = fs.readFileSync( "gulp/generators/crud/routes.js", "utf-8" );
  var angular = fs.readFileSync( "gulp/generators/crud/angular.js", "utf-8" );

  var formCtrlTest = fs.readFileSync( "gulp/generators/crud/formCtrlTest.js", "utf-8" );
  var listCtrlTest =
    fs.readFileSync( "gulp/generators/crud/listCtrlTest.js", "utf-8" );

  return {
    model: model.replace( /NAME/g, name ).replace( /FILE/g, file ),
    rest: rest.replace( /NAME/g, name ).replace( /FILE/g, file ),
    list: list.replace( /NAME/g, name ).replace( /FILE/g, file ),
    one: one.replace( /NAME/g, name ).replace( /FILE/g, file ),
    listCtrl: listCtrl.replace( /NAME/g, name ).replace( /FILE/g, file ),
    formCtrl: formCtrl.replace( /NAME/g, name ).replace( /FILE/g, file ),
    routes: routes.replace( /NAME/g, name )
      .replace( /FILE/g, file ).replace( /MODULE/g, module ),
    angular: angular.replace( /NAME/g, name )
      .replace( /FILE/g, file ).replace( /MODULE/g, module ),
    formCtrlTest: formCtrlTest.replace( /NAME/g, name ).replace( /FILE/g, file ),
    listCtrlTest: listCtrlTest.replace( /NAME/g, name ).replace( /FILE/g, file )
  };
}

function route( module, url ) {
  return url.replace( "module", module );
}

function capitalize( string ) {
  var lower = string.toLowerCase();
  return lower.charAt( 0 ).toUpperCase() + lower.slice( 1 );
}
