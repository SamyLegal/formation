var _ = require('./underscore');

function differences(array1, array2) {
  return _.filter(array1, function(element1) {
    return !_.find(array2, function(element2) {
      return _.isEqual(element1, element2);
    });
  });
}

module.exports = function(referenceArray, newArray) {
  return {
    additions: differences(newArray, referenceArray),
    deletions: differences(referenceArray, newArray)
  }
}


/*
var reference = [{toto: 'titi'}, {toto: 'tutu'}];
var newData = [{toto: 'toto'}, {toto: 'tutu'}];

var result = module.exports(reference, newData);

console.log('result', result);
*/
