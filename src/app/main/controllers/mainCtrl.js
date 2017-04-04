"use strict";

module.exports = MainCtrl;

MainCtrl.$inject = [];
function MainCtrl() {
  var mod = this;
  mod.currentDate = moment();
}
