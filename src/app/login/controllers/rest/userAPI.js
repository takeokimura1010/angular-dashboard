"use strict";

module.exports = UserAPI;

UserAPI.$inject = [ "urlApi", "Notifications", "$q" ];
function UserAPI( urlApi, Notifications, $q ) {
  var ref = new Firebase( urlApi );
  UserAPI.login = login;
  UserAPI.createAccount = createAccount;
  UserAPI.changePassword = changePassword;
  UserAPI.resetPassword = resetPassword;
  UserAPI.removeUser = removeUser;
  UserAPI.isAdmin = isAdmin;
  UserAPI.deactivate = deactivate;
  UserAPI.activate = activate;
  return UserAPI;

  function login( email, password, remember ) {
    return function( callback ) {
      return ref.authWithPassword( {
        email: email,
        password: password
      }, callback, {
        remember: remember
      } );
    };
  }

  function createAccount( credentials ) {
    var future = $q.defer();
    return ref.createUser( {
      email: credentials.email || "",
      password: credentials.password
    }, function( error, userData ) {
      if ( error ) {
        switch ( error.code ) {
          case "EMAIL_TAKEN":
            Notifications.addCustom( 400, "The email is already in use." );
          break;
          case "INVALID_EMAIL":
            Notifications.addCustom( 400, "The specified email is not a valid email." );
          break;
          default:
            Notifications.addCustom( 500, "Error creating user: ", error );
        }
        future.reject( error );
      } else {
        Notifications.addCustom( 200, "Customer account successfully created." );
        future.resolve( userData );
      }
      return future.promise;
    } );
  }

  function changePassword( credentials ) {
    var future = $q.defer();
    return ref.changePassword( {
      email: credentials.email,
      oldPassword: credentials.oldPassword,
      newPassword: credentials.newPassword
    }, function( error ) {
      if ( error ) {
        switch ( error.code ) {
          case "INVALID_PASSWORD":
            Notifications.addCustom( 400, "The user password is incorrect." );
          break;
          case "INVALID_USER":
            Notifications.addCustom( 400, "The specified user doesn't exist" );
          break;
          default:
            Notifications.addCustom( 500, "Error changing password: " + error );
        }
        future.reject( error.code );
      } else {
        Notifications.addCustom( 200, "User password changed successfully!" );
        future.resolve( true );
      }
      return future.promise;
    } );
  }

  function resetPassword( email ) {
    var future = $q.defer();
    return ref.resetPassword( {
      "email": email
    }, function( error ) {
      if ( !error ) {
        Notifications.addCustom( 200, "Password reset email sent successfully" );
        future.reject( error );
      } else {
        Notifications.addCustom( 500, "Error sending password reset email: " + error );
        future.resolve( true );
      }
      return future.promise;
    } );
  }

  function removeUser( credentials ) {
    var future = $q.defer();
    return ref.removeUser( {
      email: credentials.email,
      password: credentials.password
    }, function( error ) {
      if ( error ) {
        switch ( error.code ) {
          case "INVALID_USER":
            Notifications.addCustom( 400, "The specified user account does not exist." );
          break;
          case "INVALID_PASSWORD":
            Notifications.addCustom( 400, "The specified user account password is incorrect." );
          break;
          default:
            Notifications.addCustom( 500, "Error removing user: " + error );
        }
        future.reject( error.code );
      } else {
        Notifications.addCustom( 200, "User account deleted successfully!" );
        future.resolve( true );
      }
      return future.promise;
    } );
  }

  function isAdmin( uid ) {
    var dashboardRef = ref.child( "Dashboard" ).child( uid );
    return dashboardRef.once( "value", function( snapshot ) {
      return snapshot;
    } );
  }

  function deactivate( client ) {
    return ref.child( "BlockedUsers" ).child( client.$id ).set( true, function( error ) {
      if ( !error ) {
        client.deactivated = true;
        return client.$save().then( function() {
          return Notifications.addCustom( 200, "Client account was deactivated." );
        } );
      }
    } );
  }

  function activate( client ) {
    return ref.child( "BlockedUsers" ).child( client.$id ).remove( function( error ) {
      if ( !error ) {
        delete client.deactivated;
        delete client.deactivationDate;
        return client.$save().then( function() {
          return Notifications.addCustom( 200, "Client account was reactivated." );
        } );
      }
    } );
  }
}
