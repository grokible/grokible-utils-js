'use strict';

/**
 * QueryParamException - passed bad argument as a query param in an URL.
 */

var Inherits = require ('Inherits');
var CheckException = require ('CheckException');

var QueryParamException = function QueryParamException () {
    var obj = Inherits.superCreateNewIgnored (QueryParamException, CheckException,
        arguments);

    obj.name = obj.constructor.name;    // Set error class 'name' property
    return obj;
}

Inherits.setParentClass (QueryParamException, CheckException);

module.exports = QueryParamException;
