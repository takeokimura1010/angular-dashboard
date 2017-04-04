"use strict";

module.exports = EmailAPI;

EmailAPI.$inject = [ "Notifications", "$sessionStorage", "$http", "urlNode" ];

function EmailAPI( Notifications, $sessionStorage, $http, urlNode ) {
  var ref = urlNode + "api/email";
  EmailAPI.sendEmail = sendEmail;
  return EmailAPI;

  function sendEmail( emailData ) {
    return $http.post( ref, emailData ).then( function( resp ) {
      Notifications.addCustom( resp.status, "Email has been sent successfully." );
      return resp;
    }, function( err ) {
      Notifications.addCustom( err.status,
        _.get( err.data, "message", "Email could not be sent." ) );
      return err;
    } );
  }
}
