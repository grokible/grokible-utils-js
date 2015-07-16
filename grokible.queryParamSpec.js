'use strict';

var Inherits = require ('Inherits');
var ParamSpec = require ('../grokible.paramSpec');
var QueryParamException = require ('QueryParamException');

var QueryParamSpec = function QueryParamSpec () {
    var obj = Inherits.superCreateNewIgnored (QueryParamSpec, ParamSpec,
        { exception: QueryParamException });
    
    return obj;
}

Inherits.setParentClass (QueryParamSpec, ParamSpec);

module.exports = QueryParamSpec;
