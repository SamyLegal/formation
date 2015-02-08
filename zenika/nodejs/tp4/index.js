var router = require('./router');
var FileContacts = require('./lib/contacts-file');
var MemoryContacts = require('./lib/contacts-memory');
var Contacts = require('./lib/contacts');

Contacts.prototype = new FileContacts('data/contacts.json');
//Contacts.prototype = new MemoryContacts();

// Initialisation de la gestion des contacts
router(new Contacts());