// CheckException.js

var Inherits = require ('Local/Inherits');
var Exception = require ('Local/Exception');
var CheckException = require ('Local/CheckException');


/**
 * Exception thrown from Check library, which is useful for testing input
 * arguments to functions.
 */
var CheckException = function CheckException () {
    var obj = Inherits.superCreateNewIgnored (CheckException, Exception,
        arguments);

    obj.name = obj.constructor.name;    // Set error class 'name' property
    return obj;
}

Inherits.setParentClass (CheckException, Exception);

return module.exports = CheckException;
