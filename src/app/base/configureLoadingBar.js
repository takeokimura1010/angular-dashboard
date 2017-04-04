"use strict";

module.exports = configureLoadingBar;

var ingles = require( "../../resources/i18n/en-US.json" );
var espaniol = require( "../../resources/i18n/es-CR.json" );

function configureLoadingBar( language, cfpLoadingBarProvider ) {
  cfpLoadingBarProvider.includeSpinner = false;

  cfpLoadingBarProvider.loadingBarTemplate = "<div id='loading-bar'>" +
    "<aside class='splash-title'>" +
    "<h1>" + texts( language, "title" ) + "</h1>" +
    "<div class='bar'></div>" +
    "<p>" + texts( language, "loadingbar" ) + "</p>" +
    "<i class='fa fa-fw fa-circle-o-notch fa-2x fa-spin'></i>" +
    "</aside>" +
    "</div>";
}

function texts( language, key ) {
  switch ( language ) {
  case "es":
    return espaniol[key];
  default:
    return ingles[key];
  }
}
