"use strict";

module.exports = FormNAMECtrl;

FormNAMECtrl.$inject = [ "FILE", "NAMEAPI", "$state", "$stateParams" ];
function FormNAMECtrl( FILE, NAMEAPI, $state, $stateParams ) {
  var vm = this;
  vm.FILE = FILE;
  vm.FILE.editing = ( $stateParams.edit === "true" );
  vm.save = save;
  vm.edit = edit;
  vm.remove = remove;

  function save( validForm ) {
    if ( validForm ) {
      NAMEAPI.save( vm.FILE ).then( function( resp ) {
        reload( resp, false );
      } );
    }
  }

  function edit( value ) {
    reload( vm.FILE.$id, value );
  }

  function remove() {
    NAMEAPI.remove( vm.FILE ).then( function() {
      $state.go( "^.FILE-list" );
    } );
  }

  function reload( id, editing ) {
    $state.go( $state.current, {id: id, edit: editing}, {reload: true} );
  }
}
