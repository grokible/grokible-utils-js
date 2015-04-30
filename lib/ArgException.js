'use strict';

/**
 * Argument exception - passed bad argument to a function.
 */

var Inherits = require ('Inherits');
var CheckException = require ('CheckException');

var ArgException = function ArgException () {
    var obj = Inherits.superCreateNewIgnored (ArgException, CheckException,
        arguments);

    obj.name = obj.constructor.name;    // Set error class 'name' property
    return obj;
}

Inherits.setParentClass (ArgException, CheckException);

module.exports = ArgException;
