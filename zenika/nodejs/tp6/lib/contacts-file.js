var _ = require('underscore');
var fs = require('fs');
var diff = require('./diff.js');
var Contact = require('./contact');
var writeImplems = require('./write-implems');
var readImplems = require('./read-implems');

module.exports = function () {
  var that = this;

  var path = __dirname + '/../data/contacts.json';

  this.watch = function (callback) {
    this.get(function (contactsOriginaux) {
      fs.watchFile(path, {persistent: true}, function (event, filename) {
        //console.log("watch event :" + JSON.stringify(event));
        that.get(function (contactsModifies) {
          //console.log(diff(contactsOriginaux, contactsModifies));
          callback(contactsModifies);
          contactsOriginaux = contactsModifies;
        })
      });
    })
  };

  this.read = function (callback) {
    readImplems.stream(callback);
  };

  this.write = function (content, callback) {
    var startTime = new Date();
    writeImplems.generatorTest(content).then(function(data){
      var elapsedTime = new Date() - startTime;
      console.log("Temps écoulé avec xxx", elapsedTime, 'ms');
      //console.log(data);
      callback();
    }, function(err){
      console.log(err);
      callback();
    });
  };

  this.add = function (nom, prenom, address, phone, callback) {
    that.get(function (contacts) {
      var contact = new Contact(contacts.length, nom, prenom, address, phone);
      contacts.push(contact);
      that.write(contacts, function (data) {
        callback(contact);
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
      var contacts = _.map(data, function (contact) {
        return new Contact(contact.id, contact.nom, contact.prenom, contact.address, contact.phone);
      });
      var contactsSort = _.sortBy(contacts, function (contact) {
        return contact.id;
      });
      callback(contactsSort);
    });
  };

  this.getById = function (id, callback) {
    this.get(function (contacts) {
      var contact = _.find(contacts, function (contact) {
        return parseInt(contact.id) === parseInt(id);
      })
      callback(contact);
    })
  }

  this.put = function (id, contactToUpdate, callback) {
    this.get(function (contacts) {
      var contactUpdated = _.find(contacts, function (contact) {
        return parseInt(contact.id) === parseInt(id);
      });

      _.extend(contactUpdated, contactToUpdate);
      that.write(contacts, function () {
        callback(contactUpdated);
      })
    })
  };
}