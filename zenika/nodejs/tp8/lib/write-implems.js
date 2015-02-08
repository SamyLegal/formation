var fs = require('fs');
var path = __dirname + '/../data/contacts.json';
var async = require('async');
var q = require('q');

exports.simpleWrite = function (content, callback) {
  fs.writeFile(path, JSON.stringify(content, undefined, 2), function (err, data) {
    if (err) console.log(err);
    callback(data);
  });
}

exports.callbacks = function (contacts, callback) {
  fs.readFile(path, function (err, data) {
    if (err) throw err;
    fs.writeFile(path + '.back', data, function (err) {
      if (err) throw err;
      fs.writeFile(path, JSON.stringify(contacts, undefined, 2), function (err, data) {
        if (err) {
          fs.rename(path + '.back', path, function (err, data) {
            if (err) throw err;
            callback(data);
          });
        }

        callback(contacts);
      });
    });
  });
}

exports.async = function (contacts, callback) {
  async.waterfall([
    function (callback) {
      fs.readFile(path, callback);
    },
    function (data, callback) {
      fs.writeFile(path + '.back', data, callback);
    },
    function (callback) {
      fs.writeFile(path, JSON.stringify(contacts, undefined, 2), function (errWrite) {
        if (errWrite) {
          fs.rename(path + '.back', path, function (err, data) {
            var errors = [errWrite];
            if (err) {
              errors.push(err);
              callback(errors);
            }
          });
        } else {
          callback(null, contacts);
        }
      });
    }
  ], function (err, result) {
    if (err) console.log(err);
    callback(result);
  });
};

var readFilePromise = q.nfbind(fs.readFile);
var writeFilePromise = q.nfbind(fs.writeFile);
var renamePromise = q.nfbind(fs.rename);
var existsPromise = function (path) {
  var deferred = q.defer();
  fs.exists(path, function (exists) {
    deferred.resolve(exists);
  })
  return deferred.promise;
}

exports.q = function (contacts) {
  return readFilePromise(path)
    .then(function (data) {
      //throw new Error('Simulation d une erreur');
      return writeFilePromise(path + '.back', data);
    })
    .then(function () {
      return writeFilePromise(path, JSON.stringify(contacts, undefined, 2));
    })
    .thenResolve(contacts)
    .catch(function (err) {
      existsPromise(path + '.back').then(function (exists) {
        if (exists) {
          renamePromise(path + '.back', path);
        }
      });

      throw err;
    });

}

/*exports.generator = q.async(function* (contacts)
{
  try {
    var dataFile = yield readFilePromise(path);
    throw new Error('Simulation d une erreur');
    yield writeFilePromise(path + '.back', dataFile);
    yield writeFilePromise(path, JSON.stringify(contacts, undefined, 2));
    return contacts;
  } catch (err) {
    var exists = yield existsPromise(path + '.back');
    if (exists) {
      renamePromise(path + '.back', path);
    }
    throw err;
  }
});*/