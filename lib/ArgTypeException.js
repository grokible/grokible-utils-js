'use strict';

/**
 *  Argument Type violates expected call to function (A programming error we
 *  detect at the top of a function call, when validating parameters).
 */

var Inherits = require ('Inherits');
var Exception = require ('Exception');

var ArgTypeException = function ArgTypeException () {
    var obj = Inherits.superCreateNewIgnored (ArgTypeException,
        Exception, arguments);

    obj.name = obj.constructor.name;    // Set error class 'name' property
    return obj;
}

Inherits.setParentClass (ArgTypeException, Exception);

module.exports = ArgTypeException;
