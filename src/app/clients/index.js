"use strict";

var _name = require( "../../../package.json" ).name;

var mod = angular.module( _name + ".Clients", [] );
mod.config( require( "./routes" ) );

mod.factory( "ClientAPI", require( "./controllers/rest/clientAPI.js" ) );

mod.controller( "ListClientCtrl", require( "./controllers/listClientCtrl.js" ) );
mod.controller( "ListTrialCtrl", require( "./controllers/listTrialCtrl.js" ) );
mod.controller( "SingleClientCtrl", require( "./controllers/singleClientCtrl.js" ) );

module.exports = mod;
