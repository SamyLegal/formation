var cmis = require('cmis');
var configuration = require('../config');
var should = require('should');

describe('CMIS Documents Alfresco', function () {

  var session;
  var rootId;
  var objectId;

  before(function (done) {
    var configurationServer = configuration[configuration.type];
    session = cmis.createSession(configurationServer.repositoryUrl);
    session.setCredentials(configurationServer.auth.username, configurationServer.auth.password);
    session.loadRepositories().ok(function (repositories) {
      done();
    });
  });

  it('should retrieve an object by path', function (done) {
    session.getObjectByPath('/')
      .ok(function (data) {
        rootId = data.succinctProperties['cmis:objectId'];
        should.exist(data.succinctProperties['cmis:name'], 'name should be defined');
        done();
      })
      .notOk(function (res) {
        throw new Error(res.error);
        done();
      });
  });

  it('should create a document', function (done) {
    session.createDocument(rootId, 'Content text document', 'test01.txt', 'text/plain')
      .ok(function (data) {
        console.log(data);
        objectId = data.succinctProperties['cmis:objectId'];
        should.exist(objectId);
        done();
      })
      .notOk(function (res) {
        throw new Error(res.error);
        done();
      });
  });

  it.skip('should delete a document', function (done) {
    session.deleteObject(objectId)
      .ok(function () {
        done();
      })
      .notOk(function (res) {
        throw new Error(res.error);
        done();
      });
  });

});