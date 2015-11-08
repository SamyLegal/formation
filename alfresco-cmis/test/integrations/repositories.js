var Promise = require('bluebird');
var cmis = require('cmis');
var configuration = require('../config');
var should = require('should');

Promise.promisifyAll(cmis);

describe.only('CMIS Repositories Alfresco', function () {

  var session;

  before(function () {
    var configurationServer = configuration[configuration.type];
    session = cmis.createSession(configurationServer.repositoryUrl);
    Promise.promisifyAll(session);
    session.setCredentials(configurationServer.auth.username, configurationServer.auth.password);
    session.setGlobalHandlers(console.log, console.log);
  });

  it('should load repositories', function (done) {
    session.loadRepositories()
      .ok(function (repositories) {
        should.exist(repositories);
        done();
      })
      .notOk(function (err) {
        done(err);
      });
  });

  it('should return a promise', function (done) {
    session.loadRepositories()
      .then(function (repositories) {
        should.exist(repositories);
        done();
      })
      .notOk(function (err) {
        done(err);
      });
  });
});