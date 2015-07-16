
var Check = require ('Check');
var QueryParamException = require ('./grokible.queryParamException');

var getDefault = function (opt) {
    var v;
    if ('default' in opt)
        v = opt ['default'];
    return v;
}

exports.getInteger = function getInteger (query, name, opt) {
    var v = getDefault (opt);

    var orig_v;
    if (name in query) {
	orig_v = query [name];
	v = parseInt (orig_v);
    }

    Check.isInteger (v, { exception: QueryParamException,
        message: "Expected query param '" + name + "=" + orig_v +
            "' to be an integer." });

    return v;
};

exports.exists = function exists (query, name, opt) {
    return name in query;
};



