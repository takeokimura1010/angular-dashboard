"use strict";

var mod = angular.module( "BaseProject.login", [] );

mod.config( require( "./routes" ) );

mod.controller( "LoginCtrl", require( "./controllers/login.js" ) );

mod.factory( "UserAPI", require( "./controllers/rest/userAPI.js" ) );

module.exports = mod;
