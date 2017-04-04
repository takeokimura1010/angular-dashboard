"use strict";

module.exports = ListNAMECtrl;

ListNAMECtrl.$inject = [ "list", "NAMEAPI", "$state", "$stateParams" ];
function ListNAMECtrl( list, NAMEAPI, $state, $stateParams ) {
  var vm = this;
  vm.page = parseInt( $stateParams.page || 0 ) + 1;
  vm.qty = parseInt( $stateParams.qty || 10 );
  vm.list = list;
  vm.remove = remove;
  vm.updatePage = updatePage;

  function remove( FILE ) {
    if ( confirm( "Are you sure you want to remove this NAME?" ) ) {
      NAMEAPI.remove( FILE ).then( function() {
        vm.list = _.reject( vm.list, function( elem ) {
          return elem.$id === FILE.$id;
        } );
      } );
    }
  }

  function updatePage( page ) {
    $state.go( $state.current, {page: page, qty: vm.qty}, {reload: false} );
  }
}
