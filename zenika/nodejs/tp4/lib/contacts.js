var _= require('underscore');

module.exports = function () {

  this.print = function () {
    this.get(function (contacts) {
      var contactsSort = _.sortBy(contacts, function (contact) {
        return contact.id;
      });
      contactsSort.forEach(function (contact) {
        console.log(contact.toString());
      });
    })
  }
}