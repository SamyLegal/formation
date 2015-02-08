var fs = require('fs');
var diff = require('./lib/diff.js');
var package = require('./package.json');
var _ = require('underscore');
require('colours');

var program = require('commander');

function Contact(id, nom, prenom) {
  this.id = id;
  this.nom = nom;
  this.prenom = prenom;

  this.toString = function () {
    if (program.colours) {
      return this.id + ' ' + this.nom.toUpperCase().blue + ' ' + this.prenom.red;
    } else {
      return this.id + ' ' + this.nom.toUpperCase() + ' ' + this.prenom;
    }
  }
}

function FileContacts() {
  var that = this;

  this.path = './contacts.json';

  this.watch = function () {
    this.get(function (contactsOriginaux) {
      fs.watchFile(that.path, {persistent: true}, function (event, filename) {
        console.log("watch event :" + JSON.stringifevent);
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

Contacts.prototype = new FileContacts();

function Contacts() {

  this.print = function () {
    this.get(function (contacts) {
      contacts.forEach(function (contact) {
        console.log(contact.toString());
      });
    })
  }
}

var contactsToDisplay = new Contacts();

program
  .command('add <nom> <prenom>')
  .action(function (nom, prenom) {
    if (nom && prenom) {
      contactsToDisplay.add(nom, prenom, function (data) {
        contactsToDisplay.print();
      });
    }
  });

program
  .command('delete <id>')
  .action(function (id) {
    if (id) {
      contactsToDisplay.delete(id, function (data) {
        contactsToDisplay.print();
      });
    }
  });

program
  .command('watch')
  .action(function () {
    contactsToDisplay.watch();
  });

program
  .version(package.version)
  .option('-p, --print', 'Print contacts')
  .option('-c, --colours', 'Colour contacts');

program.parse(process.argv);


console.log('Gestion des contacts');
if (program.print) {
  contactsToDisplay.print();
}
