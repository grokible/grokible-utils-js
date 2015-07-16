// CheckException.js

var Inherits = require ('Inherits');
var Exception = require ('Exception');

/**
 * Exception thrown from Check library, which is useful for testing input
 * arguments to functions.
 */
var HttpException = function HttpException () {
    var obj = Inherits.superCreateNewIgnored (HttpException, Exception,
        arguments);

    obj.name = obj.constructor.name;    // Set error class 'name' property
    return obj;
}

Inherits.setParentClass (HttpException, Exception);

module.exports = HttpException;
