var assert = require('assert');
var MemoryContacts = require('./../lib/contacts-memory');
var Contacts = require('./../lib/contacts');
var Contact = require('./../lib/contact');
var chai = require('chai');
var sinon = require('sinon');

var contactsMemory;
beforeEach(function(done){
  Contacts.prototype = new MemoryContacts();
  contactsMemory = new Contacts();
  chai.should();
  done();
});

describe('MemoryContacts', function () {
  it('should the nom of first contact is in uppercase', function (done) {
    contactsMemory.get(function(contacts){
      var isInUpperCase = /[A-Z]* [A-Za-z]*/.test(contacts[0].toString());
      assert.equal(isInUpperCase, true);
      done();
    })
  });

  it('should the nom of first contact is in uppercase with should', function (done) {
    contactsMemory.get(function(contacts){
      /[A-Z]* [A-Za-z]*/.test(contacts[0].toString()).should.be.true;
      done();
    })
  });

  it('should call once time the toString method of a contact object', function (done) {
    contactsMemory.get(function(contacts){
      var contactToString = sinon.spy(contacts[0],'toString');
      /[A-Z]* [A-Za-z]*/.test(contacts[0].toString()).should.be.true;
      assert(contactToString.calledOnce);
      done();
    })
  });
});

