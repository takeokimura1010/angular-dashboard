"use strict";

var mod = angular.module( "BaseProject.Main", [] );
mod.config( require( "./routes" ) );

mod.controller( "MainCtrl", require( "./controllers/mainCtrl.js" ) );
mod.factory( "EmailAPI", require( "./controllers/rest/emailAPI.js" ) );

module.exports = mod;
