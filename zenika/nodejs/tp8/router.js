var _ = require('underscore');
var package = require('./package.json');
var program = require('commander');
var web = require('./web');

require('colours');

module.exports = function (contactsToDisplay) {
  program
    .command('add <nom> <prenom> <address> <phone>')
    .action(function (nom, prenom, address, phone) {
      if (nom && prenom) {
        contactsToDisplay.add(nom, prenom, address, phone, function (data) {
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
    .command('serve')
    .action(function (id) {
      web(program.cluster, contactsToDisplay);
    });

  program
    .command('watch')
    .action(function () {
      contactsToDisplay.watch();
    });

  program
    .version(package.version)
    .option('-p, --print', 'Print contacts')
    .option('-c, --colours', 'Colour contacts')
    .option('-d, --cluster', 'Cluster');

  program.parse(process.argv);

  console.log('Gestion des contacts');
  if (program.print) {
    contactsToDisplay.print();
  }
}

