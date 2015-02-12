/*
 * Qu'est ce qui ce passe si on accete et refuse une promesse au niveau d'une même fonction.
 * La spécification sur les promesses indique que une fois résolu ou rejeté une promesse ne peut pas changer d'état pour le 
 * reste de sa durée de vie. C'est un point important concernant les promesses et c'est ce qui les différencie d'un EventEmitter (et autres formes de callbacks)
 */

var q = require('q');

var def = q.defer();
def.promise.then(console.log, console.log);
def.resolve("I FIRED");
def.reject("I DID NOT FIRE");