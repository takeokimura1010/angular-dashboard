"use strict";

var angular = window.angular;

var mod = angular.module( "BaseProject.base", [] );

mod.config( require( "./routes" ) );

mod.controller( "NavigationCtrl", require( "./services/navigationCtrl.js" ) );

mod.factory( "Notifications", require( "./services/notifications" ) );
mod.factory( "Futures", require( "./services/futures" ) );

mod.directive( "clickOn", require( "./directives/clickOn.js" ) );
mod.directive( "cisSwitch", require( "./directives/cisSwitch.js" ) );
mod.directive( "cisTitle", require( "./directives/cisTitle.js" ) );
mod.directive( "cisMinimize", require( "./directives/cisMinimize.js" ) );
mod.directive( "numerical", require( "./directives/cisNumericalInput.js" ) );
mod.directive( "cisEnter", require( "./directives/cisEnter.js" ) );
mod.directive( "compareTo", require( "./directives/compareTo.js" ) );
mod.directive( "btnBack", require( "./directives/btnBack.js" ) );
mod.directive( "dateInput", require( "./directives/dateInput" ) );
mod.directive( "cisMonthpicker", require( "./directives/cisMonthpicker.js" ) );

var filters = require( "./filters" );
mod.filter( "Date", filters.date );
mod.filter( "Percentage", filters.percentage );
mod.filter( "month", filters.month );

module.exports = mod;
