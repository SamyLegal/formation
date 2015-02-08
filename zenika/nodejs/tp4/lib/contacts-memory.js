var _ = require('underscore');
var Contact = require('./contact');
var contacts = require('./../data/contacts.json');

module.exports = function () {
  var memoryContacts = [];

  _.each(contacts, function (contact) {
    memoryContacts.push(new Contact(contact.id, contact.nom, contact.prenom));
  });

  this.get = function (callback) {
    callback(memoryContacts);
  };
}