
var Inherits = require ('grokible.inherits.js');
var ParamSpec = require ('grokible.paramSpec.js');

var Exceptions = require ('grokible.exceptions.js');
var QueryParamException = Exceptions.QueryParamException;

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
