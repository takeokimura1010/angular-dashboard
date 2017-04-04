"use strict";

module.exports = notifications;

notifications.$inject = [ "toastr" ];

function notifications( toastr ) {
  notifications.add = add;
  notifications.addCustom = addCustom;
  return notifications;

  function type( status ) {
    switch ( String( status ).substr( 0, 1 ) ){
      case "2":
        return toastr.success;
      case "4":
        return toastr.info;
      case "5":
        return toastr.error;
      default:
        return toastr.warning;
    }
  }

  function add( status, obj ) {
    type( status )( ofStatus( status, obj ) );
  } //function

  function addCustom( status, message ) {
    type( status )( message );
  } //function

  function ofStatus( status, obj ) {
    var elem = obj || "document";
    switch ( status ) {
    case 0:
      return "<strong>0</strong> - There's no communication to the server";
    case 200:
      return "<strong>200</strong> - Your request has been successful";
    case 201:
      return "<strong>201</strong> - The element " + elem + " has been successfully saved";
    case 204:
      return "<strong>204</strong> - The element " + elem + " has been successfully deleted";
    case 400:
      return "<strong>400</strong> - Missing data required to complete the request";
    case 403:
      return "<strong>493</strong> - Invalid credentials";
    case 404:
      return "<strong>404</strong> - " + elem + " not found";
    case 409:
      return "<strong>409</strong> - " +
       "The action can't execute because it will generate conflict";
    case 470:
      return "<strong>470</strong> - Identification of " + elem + " is not valid";
    case 471:
      return "<strong>471</strong> - " + elem + " already exists";
    case 472:
      return "<strong>472</strong> - Expired credentials";
    case 473:
      return "<strong>473</strong> - Incorrect credentials";
    case 500:
      return "<strong>500</strong> - " +
       "There has been an unexpected error, please try again later";
    case 501:
      return "<strong>501</strong> - The service has not been implemented";
    case 530:
      return "<strong>530</strong> - We couldn't complete your request because" +
      " It took us too long to process, please try again later";
    default:
      return "<strong>0</strong> - Notification without a message";
    }
  }
} //functions
