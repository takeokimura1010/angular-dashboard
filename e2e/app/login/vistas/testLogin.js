"use strict";

describe( "Login Test", function() {
  beforeEach( function() {
    browser.ignoreSynchronization = false;
    browser.get( "/" );
    browser.sleep( 2000 );
  } );

  it( "System logout", logoutTest );

  function loginTest() {
    var user = element( by.model( "vm.user.login" ) );
    var password = element( by.model( "vm.user.password" ) );
    user.sendKeys( "admin" );
    password.sendKeys( "odooCiris.93" );
    element( by.css( ".form-horizontal button[type='submit']" ) ).click();
    browser.driver.wait( function( ) {
      return browser.driver.getCurrentUrl( ).then( function( url ) {

        //browser.pause();
        return ( /main/ ).test( url );
      } );
    } );
  }

  function logoutTest() {
    loginTest();
    element( by.css( ".dropdown-toggle" ) ).click();
    element( by.css( "[ng-click='nav.logout()']" ) ).click();
    expect( true ).toEqual( true );
  }

} );
