"use strict";

var _name = require( "../../../package.json" ).name;

var mod = angular.module( _name + ".MODULENAME", [] );
mod.config( require( "./routes" ) );

mod.controller( "MODULENAMECtrl", require( "./controllers/MODULEFILECtrl.js" ) );

module.exports = mod;
