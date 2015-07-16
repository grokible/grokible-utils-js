'use strict';

/**
 * QueryParamException - passed bad argument as a query param in an URL.
 */

var Inherits = require ('Inherits');
var HttpException = require ('./grokible.httpException');

var QueryParamException = function QueryParamException () {
    var obj = Inherits.superCreateNewIgnored (QueryParamException,
        HttpException, arguments);

    obj.name = obj.constructor.name;    // Set error class 'name' property
    return obj;
}

Inherits.setParentClass (QueryParamException, HttpException);

module.exports = QueryParamException;
