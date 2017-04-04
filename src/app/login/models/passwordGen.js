"use strict";

module.exports = generatePassword;

function generatePassword() {
  return Math.random().toString( 36 ).substr( 2, 8 );
}
