var ContactModel = require("./../models/contact");
var mongoose = require('mongoose');
var _ = require('underscore');

var getContact = function (contact) {
  var cloneContact = _.clone(contact.toJSON());
  cloneContact.id = contact._id;
  delete cloneContact._id;
  return cloneContact;
};

module.exports = function () {
  mongoose.connect('mongodb://localhost/test');

  this.get = function (callback) {
    ContactModel.find(function (err, data) {
      var contacts = _.map(data, function (contact) {
        return getContact(contact);
      });
      callback(contacts);
    });
  }

  this.add = function (nom, prenom, address, phone, callback) {
    var contact = new ContactModel({
      nom: nom,
      prenom: prenom,
      address: address,
      phone: phone
    });
    contact.save(function (err, contact) {
      ContactModel.emit('add', contact);
      if (err) console.log(err);
      callback(getContact(contact));
    });
  };

  this.put = function (id, contact, callback) {
    ContactModel.findByIdAndUpdate(id, contact, function (err, contact) {
      callback(contact);
    })
  };

  this.getById = function (id, callback) {
    console.log(id);
    ContactModel.findById(id, function (err, contact) {
      callback(getContact(contact));
    })
  };

  this.delete = function (id, callback) {
    console.log(id);
    ContactModel.findByIdAndRemove(id, function (err, contact) {
      if (err) console.log(err);
      ContactModel.emit('delete', id);
      callback(contact);
    })
  };

  this.watch = function (callback) {
    var that = this;
    ContactModel.on('delete', function (err, param1) {
      console.log([err,param1]);
      that.get(function (contacts) {
        callback(contacts);
      })
    });

    ContactModel.on('add', function (err, param1) {
      console.log([err,param1]);
      that.get(function (contacts) {
        callback(contacts);
      })
    });
  };

  this.close = function () {
    mongoose.disconnect();
  }

}