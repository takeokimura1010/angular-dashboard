"use strict";

var Customer = require( "../../../../src/app/customers/models/customer.js" );

describe( "test of customer model", function() {
  beforeEach( function() {
    this.customer = new Customer();
  } );

  it( "it should add a job if description and date is not undefined", addJobOK );
  it( "it shouldn't add a job if description is undefined", addJobWithoutDate );
  it( "it shouldn't add a job if date is undefined", addJobWithoutDescription );
  it( "it should add an email if it's not an empty string", addEmailOK );
  it( "it shouldn't add an email if it's an empty string", addEmailEmpty );
  it( "should copy data from customer info to owner info", copyCustToOwner );
  it( "should copy data from owner info to customer info", copyOwnerToCust );

} );

function addEmailOK() {
  this.customer.fb.emails = [ "developer@ciriscr.com" ];
  this.customer.newEmail = "desarrollador@ciriscr.com";
  this.customer.addEmail();
  expect( this.customer.fb.emails ).toEqual( [ "developer@ciriscr.com",
  "desarrollador@ciriscr.com" ] );
}

function addEmailEmpty() {
  this.customer.fb.emails = [ "developer@ciriscr.com" ];
  this.customer.newEmail = null;
  this.customer.addEmail();
  expect( this.customer.fb.emails ).toEqual( [ "developer@ciriscr.com" ] );
}

function addJobOK() {
  this.customer.newJob = {description: "fix fire extinguishers",
  date: "Fri Feb 12 2016 00:00:00 GMT-0600 (CST)"};
  this.customer.addJob();
  expect( this.customer.fb.jobList ).toEqual( [ {description: "fix fire extinguishers",
  date: "Fri Feb 12 2016 00:00:00 GMT-0600 (CST)"} ] );
}

function addJobWithoutDescription() {
  this.customer.newJob = {
    date: "Fri Feb 12 2016 00:00:00 GMT-0600 (CST)"
  };
  this.customer.addJob();
  expect( this.customer.fb.jobList ).toEqual( [] );
}

function addJobWithoutDate() {
  this.customer.newJob = {
    description: "fix fire extinguishers"
  };
  this.customer.addJob();
  expect( this.customer.fb.jobList ).toEqual( [] );
}

function copyCustToOwner() {
  this.customer.fb.custInfo = {
    customerName: "Developer"
  };
  this.customer.copy2owner();
  expect( this.customer.fb.custInfo.customerName ).toEqual( this.customer.fb.ownerInfo.ownerName );
}

function copyOwnerToCust() {
  this.customer.fb.ownerInfo = {
    ownerName: "Developer"
  };
  this.customer.copy2cust();
  expect( this.customer.fb.ownerInfo.ownerName ).toEqual( this.customer.fb.custInfo.customerName );
}
