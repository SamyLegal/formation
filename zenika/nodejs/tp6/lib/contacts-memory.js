var _ = require('underscore');
var Contact = require('./contact');
var contacts = require('./../data/contacts.json');

module.exports = function () {
  var memoryContacts = [];

  _.each(contacts, function (contact) {
    memoryContacts.push(new Contact(contact.id, contact.nom, contact.prenom, contact.address, contact.phone));
  });

  this.get = function (callback) {
    var contactsSort = _.sortBy(memoryContacts, function (contact) {
      return contact.id;
    });
    callback(contactsSort);
  };
}