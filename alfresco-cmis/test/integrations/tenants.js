var cmis = require('cmis');
var Promise = require('bluebird');
var request = require('request');
var should = require('should');

Promise.promisifyAll(request, {multiArgs: true});

var tenantId = 'crpldeva';

describe('Tenants Alfresco', function () {

  it('should create a tenant', function () {

    var query = {
      url: 'http://192.168.99.100:8080/alfresco/service/api/tenants',
      auth: {
        username: 'admin',
        password: 'admin'
      },
      json: {
        tenantDomain: tenantId,
        tenantAdminPassword: tenantId,
        enable: true,
        tenantContentStoreRoot: tenantId
      }
    };

    return request.postAsync(query)
      .spread(function (res, body) {
        console.log(res);
        if (res.statusCode >= 400) {
          throw new Error(JSON.stringify(body));
        }
        should(res.statusCode).eql(200);
      });
  });

  it.only('should get tenants', function () {

    var query = {
      url: 'http://192.168.99.100:8080/alfresco/service/api/tenants',
      auth: {
        username: 'admin',
        password: 'admin'
      },
      json: true
    };

    return request.getAsync(query).spread(function (res, body) {
      if (res.statusCode >= 400) {
        throw new Error(JSON.stringify(body));
      }
      should(res.statusCode).eql(200);
      body.tenants.should.be.instanceof(Array).and.have.lengthOf(1);
      should(body.tenants[0].tenantDomain).eql(tenantId);
    });
  });

  it('should delete a tenant', function () {

    var query = {
      url: 'http://192.168.99.100:8080/alfresco/service/api/tenants/' + tenantId,
      auth: {
        username: 'admin',
        password: 'admin'
      },
      json: {
        delete: true
      }
    };

    return request.delAsync(query).spread(function (res, body) {
      if (res.statusCode >= 400) {
        throw new Error(JSON.stringify(body));
      }
      should(res.statusCode).eql(200);
    });
  });

});