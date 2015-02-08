var _ = require('underscore');
var fs = require('fs');
var diff = require('./diff.js');
var Contact = require('./contact');

module.exports = function (path) {
  var that = this;

  this.path = path;

  this.watch = function () {
    this.get(function (contactsOriginaux) {
      fs.watchFile(that.path, {persistent: true}, function (event, filename) {
        console.log("watch event :" + JSON.stringify(event));
        that.get(function (contactsModifies) {
          console.log(diff(contactsOriginaux, contactsModifies));
          contactsOriginaux = contactsModifies;
        })
      });
    })
  };

  this.read = function (callback) {
    fs.readFile(this.path, function (err, contacts) {
      if (err) console.log(err);
      callback(contacts);
    });
  };

  this.write = function (content, callback) {
    fs.writeFile(this.path, JSON.stringify(content, undefined, 2), function (err, data) {
      if (err) console.log(err);
      callback(data);
    });
  };

  this.add = function (nom, prenom, callback) {
    that.get(function (contacts) {
      contacts.push(new Contact(contacts.length, nom, prenom));
      that.write(contacts, function (data) {
        callback(data);
      })
    });
  };

  this.delete = function (id, callback) {
    that.get(function (contacts) {
      var contactsClean = _.reject(contacts, function (contact) {
        return parseInt(contact.id) === parseInt(id);
      });
      that.write(contactsClean, function (data) {
        callback(data);
      })
    });
  };

  this.get = function (callback) {
    that.read(function (data) {
      var contacts = _.map(JSON.parse(data), function (contact) {
        return new Contact(contact.id, contact.nom, contact.prenom);
      });
      callback(contacts);
    });
  };
}