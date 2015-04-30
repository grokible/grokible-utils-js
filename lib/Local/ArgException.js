'use strict';

// ArgException.js

var Inherits = require ('Local/Inherits');
var CheckException = require ('Local/CheckException');

/**
 * Argument exception - passed bad argument to a function.
 */
var ArgException = function ArgException () {
    var obj = Inherits.superCreateNewIgnored (ArgException, CheckException,
        arguments);

    obj.name = obj.constructor.name;    // Set error class 'name' property
    return obj;
}

Inherits.setParentClass (ArgException, CheckException);

module.exports = ArgException;
