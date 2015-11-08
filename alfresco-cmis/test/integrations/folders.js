var cmis = require('cmis');
var Promise = require('bluebird');
var configuration = require('../config');
var should = require('should');

describe('CMIS Folders Alfresco', function () {

  var session;
  var rootId;

  before(function (done) {
    var configurationServer = configuration[configuration.type];
    session = cmis.createSession(configurationServer.repositoryUrl);
    session.setCredentials(configurationServer.auth.username, configurationServer.auth.password);
    session.setGlobalHandlers(console.log, console.log);
    session.loadRepositories().ok(function (repositories) {
      done();
    });
  });

  it('should retrieve an object by path', function (done) {
    session.getObjectByPath('/').ok(function (data) {
      rootId = data.succinctProperties['cmis:objectId'];
      should.exist(data.succinctProperties['cmis:name'], 'name should be defined');
      done();
    });
  });

  it('should create a hierarchy folder', function (done) {
    session.createFolder(rootId, 'Root level').ok(function (data) {
      randomFolderId = data.succinctProperties['cmis:objectId'];
      session.createFolder(randomFolderId, 'First Level').ok(function (data2) {
        firstChildId = data2.succinctProperties['cmis:objectId'];
        session.createFolder(firstChildId, 'Second Level').ok(function (data3) {
          secondChildId = data3.succinctProperties['cmis:objectId'];
          should.exist(secondChildId, 'objectId should be defined');
          done();
        });
      });
    });
  });

  it('should delete a hierarchy folder', function (done) {
    session.getObjectByPath('/Root level').ok(function (data) {
      var rootLevelFolderId = data.succinctProperties['cmis:objectId'];
      session.deleteTree(rootLevelFolderId, true).ok(function () {
        done();
      });
    });
  });
});