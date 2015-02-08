var contacts = require('./contacts.json');
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
      return this.nom.toUpperCase().blue + ' ' + this.prenom.red;
    } else {
      return this.nom.toUpperCase() + ' ' + this.prenom;
    }
  };
}

function MemoryContacts() {
  var memoryContacts = [];

  _.each(contacts, function (contact) {
    memoryContacts.push(new Contact(contact.id, contact.lastName, contact.firstName));
  });

  this.get = function (callback) {
    callback(memoryContacts);
  };
}

Contacts.prototype = new MemoryContacts();

function Contacts() {

  this.print = function () {
    this.get(function (contacts) {
      contacts.forEach(function (contact) {
        console.log(contact.toString());
      });
    });
  };
}

program
  .version(package.version)
  .option('-p, --print', 'Print contacts')
  .option('-c, --colours', 'Colour contacts')
  .parse(process.argv);

var contactsToDisplay = new Contacts();

console.log('Gestion des contacts :');
if (program.print) {
  contactsToDisplay.print();
}
