var _ = require('underscore');
var FileContacts = require('./contacts-file');

function Contacts() {

  this.print = function () {
    Contacts.prototype.get(function (contacts) {
      contacts.forEach(function (contact) {
        console.log(contact.toString());
      });
    })
  };

  this.get = function () {
    if (arguments && arguments.length > 0) {
      if (_.isFunction(arguments[0])) {
        var callback = arguments[0];
        Contacts.prototype.get(function (contacts) {
          callback(contacts);
        })
      } else {
        var id = parseInt(arguments[0]);
        var callback = arguments[1];
        Contacts.prototype.getById(id, function (contacts) {
          callback(contacts);
        })
      }
    }
  };
}

Contacts.prototype = new FileContacts();

module.exports = Contacts;