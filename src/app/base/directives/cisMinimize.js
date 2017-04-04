"use strict";

module.exports = cisMinimize;

function cisMinimize() {
  return {
    restrict: "A",
    scope: true,
    link: function( $scope, $element ) {
      if ( $( window ).width() < 768 ) {
        darken();
        styles();
      }
      $element.on( "click", minimize );
      function minimize() {
        darken();
        styles();
      }
    }
  };
}

function styles() {
  $( "#wrapper" ).toggleClass( "minimized" );
  $( "#logo" ).toggleClass( "hideLogo" );
  if ( $( "#wrapper" ).hasClass( "minimized" ) ) {
    $( "#MinifierIcon" ).removeClass( "fa-chevron-left" );
    $( "#MinifierIcon" ).addClass( "fa-chevron-right" );
  } else {
    $( "#MinifierIcon" ).removeClass( "fa-chevron-right" );
    $( "#MinifierIcon" ).addClass( "fa-chevron-left" );
  }
}

function darken() {
  if ( $( window ).width() < 768 ) {
    if ( $( "#wrapper" ).hasClass( "minimized" ) ) {
      $( "#darken" ).removeClass( "hidden" );
    } else {
      $( "#darken" ).addClass( "hidden" );
    }
  }

}
