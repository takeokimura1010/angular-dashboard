"use strict";

module.exports = {
  setClientStatus: setClientStatus,
  setTrialStatus: setTrialStatus,
  checkDate: checkDate
};

function setClientStatus( list ) {
  _.forEach( list, function( elem ) {
    if ( elem.deactivated ) {
      elem.status = "Deactivated";
    } else if ( elem.freeExpDate ) {
      elem.status = "Free User";
    } else if ( elem.trial ) {
      elem.status = "Trial User";
    } else {
      elem.status = "Paying";
    }
  } );
  return list;
}

function setTrialStatus( list ) {
  _.forEach( list, function( elem ) {
    elem.status = checkDate( elem );
  } );
  return list;
}

function checkDate( client ) {
  var diff = moment().diff( moment( client.subscribedOn ), "day" );
  if ( diff === 0 ) { //ignores the day the user subscribed on
    return 30;
  }
  if ( diff > 30 ) {
    return "Expired";
  }
  return 30 - diff + 1;
}
