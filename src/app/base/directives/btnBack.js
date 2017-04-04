"use strict";
module.exports = btnBack;

function btnBack() {
  return {
    restric: "EA",
    link: link
  };
}

function link( scope, elem ) {
  elem.on( "click", function() {
    window.history.back();
  } );
}
