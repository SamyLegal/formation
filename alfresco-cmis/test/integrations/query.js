var cmis = require('cmis');
var configuration = require('../config');
var should = require('should');

describe('CMIS Repositories Alfresco', function () {

  var session;

  before(function (done) {
    var configurationServer = configuration[configuration.type];
    session = cmis.createSession(configurationServer.repositoryUrl);
    session.setCredentials(configurationServer.auth.username, configurationServer.auth.password);
    session.setGlobalHandlers(console.log, console.log);
    session.loadRepositories().ok(function () {
      done();
    });
  });

  it('should query the repository', function (done) {
    session
      .query("select * from cmis:document", false, {
        maxItems: 3
      })
      .ok(function (data) {
        should(data.results.length).eql(3);
        done();
      })
      .notOk(function (err) {
        done(err);
      });
  });

});