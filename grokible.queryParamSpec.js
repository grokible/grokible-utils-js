'use strict';

var Inherits = require ('Inherits');
var ParamSpec = require ('./grokible.paramSpec');
var QueryParamException = require ('./grokible.queryParamException');

var QueryParamSpec = function QueryParamSpec () {
    // Copy first two mandatory args ('args', 'spec') and 3rd optional ('opt')
    var arr = [];
    arr [0] = arguments [0];
    arr [1] = arguments [1];

    var opt = arguments.length >= 3 ? arguments [2] : {};

    if ( ! ('exception' in opt))
	opt ['exception'] = QueryParamException;

    arr [2] = opt;

    var obj = Inherits.superCreateNewIgnored (QueryParamSpec, ParamSpec, arr);
    return obj;
}

Inherits.setParentClass (QueryParamSpec, ParamSpec);

module.exports = QueryParamSpec;
