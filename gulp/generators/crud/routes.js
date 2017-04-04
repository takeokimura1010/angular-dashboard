$stateProvider.state( "index.MODULE.FILE-list", {
  templateUrl: "MODULE/views/listNAME.html",
  url: "/FILE?page&qty",
  controller: "ListNAMECtrl",
  controllerAs: "vm",
  resolve: {
    list: listNAME
  },
  data: {
    title: "NAME List",
    icon: "fa-list",
    menu: "NAME List"
  }
} );

$stateProvider.state( "index.MODULE.FILE-one", {
  templateUrl: "MODULE/views/formNAME.html",
  url: "/FILE/:id?edit",
  controller: "FormNAMECtrl",
  controllerAs: "vm",
  resolve: {
    FILE: getNAME
  },
  data: {
    title: "NAME Form",
    icon: "fa-file-o",
    menu: "NAME Form"
  }
} );

listNAME.$inject = [ "NAMEAPI", "$stateParams", "$auth", "$q" ];
function listNAME( NAMEAPI, $stateParams, $auth, $q ) {
  if ( $auth.getPayload().permissions.FILE.list ) {
    return NAMEAPI.list( $stateParams.page, $stateParams.qty );
  }
  return $q.reject( {authenticated: false} );
}

getNAME.$inject = [ "NAMEAPI", "$stateParams", "Validations", "$q" ];
function getNAME( NAMEAPI, $stateParams, Validations, $q ) {
  if ( Validations.letPass( $stateParams, "FILE" ) ) {
    return NAMEAPI.get( $stateParams.id, $stateParams.edit );
  }
  return $q.reject( {authenticated: false} );
}
