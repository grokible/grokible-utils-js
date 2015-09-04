
var Inherits = require ('grokible.inherits.js');
var Check = require ('grokible.check.js');
var Helpers = require ('grokible.helpers.js');

var Exceptions = require ('grokible.exceptions.js');
var ArgException = Exceptions.ArgException;
var ArgTypeException = Exceptions.ArgTypeException;
var QueryParamException = Exceptions.QueryParamException;

var extend = Helpers.extend;

var format = require ('string-format').extend (String.prototype);

var ParamSpec = function (argsOrContext, spec, opt) {
    var obj = Inherits.superCreateNewIgnored (ParamSpec, Object);
    obj._spec = spec;
    obj._opt = opt;
    obj.setArgsUsingArgsOrContext (argsOrContext);
    return obj;
};

ParamSpec.prototype.getArgs = function () { return this._args }

/**
 * Allows setting using either a arg dictionary ('args') or using a
 * Koa Context (something with a dict named 'query' and/or a set of
 * fields as in this.request.body.fields as would be set by 
 * koa-better-body (parsed POST data fields).
 */
ParamSpec.prototype.setArgsUsingArgsOrContext = function (argsOrContext) {
    var isContext = false;
    this._args = {};

    if (argsOrContext === undefined)
        return;

    if ('query' in argsOrContext) {
        isContext = true;
        extend (this._args, argsOrContext.query);
    }
        

    if ('request' in argsOrContext && 'body' in argsOrContext.request &&
        'fields' in argsOrContext.request.body) {
        isContext = true;
        extend (this._args, argsOrContext.request.body.fields);
    }

    /* Not context so must be plain args */

    if ( ! isContext)
        this._args = argsOrContext;
}

ParamSpec.prototype.getSpec = function () { return this._spec }
ParamSpec.prototype.setSpec = function (spec) { this._spec = spec }

ParamSpec.prototype.getOpt = function () { return this._opt }
ParamSpec.prototype.setOpt = function (opt) { this._opt = opt }

ParamSpec.prototype.get = function (name) {
    var v, v2, arg, spec, type, v_type;
    var exCtor, msg;

    var exopt = { spec: this._spec };

    if (this._opt && ('exception' in this._opt))
	exCtor = this._opt ['exception'];
    else
	exCtor = ArgException;

    if (name in this._spec)
	spec = this._spec [name];
    else
	throw exCtor ("No spec '{}' in ParamSpec".format (name), exopt);

    if ('default' in spec)
        v = spec ['default'];

    if (name in this._args) {
	arg = this._args [name];
	v = arg;
    }

    type = ('type' in spec) ? spec ['type'] : 'string';

    // If v is undefined at this point, it means there was no default and
    // no argument passed.  Flags, will be undefined if not passed.

    if (v === undefined && type != 'flag')
        throw exCtor ("No arg found named '{}'".format (name), exopt);

    v_type = typeof v;


    // Coercion (e.g. coerce string to other type by parsing)
    if (v_type === 'string') {
        try {
            if (type === 'string') {
	        v2 = v;
            } else if (type === 'number')
                v2 = parseFloat (v);
            else if (type === 'integer')
                v2 = parseInt (v);
            else if (type === 'flag')
		v2 = true;  // anything with flag should be true
        } catch (e) {
	    msg = "Failed attempting to convert string value '{}' to type {}";
	    msg.format (v, type);
	    throw exCtor (msg, exopt);
        }
    } else if (v_type === 'undefined') {
	if (type === 'flag')
	    v2 = name in this._args;
	else
	    throw ArgException ("Undefined value only allowed on 'flag' " +
                "not type={}".format (type), exopt);
    } else {
	// not a string arg, so no coercion
        v2 = v;
    }

    // v2 now holds the typed thing, check it
    msg = "Expected query param '{}={}' to be a {}.".format (name, arg, type);

    try {
	if (type === 'string')
	    Check.isString (v2, { exception: exCtor, message: msg });
	else if (type === 'number')
	    Check.isNumber (v2, { exception: exCtor, message: msg });
	else if (type === 'integer')
	    Check.isInteger (v2, { exception: exCtor, message: msg });
	else if (type === 'flag') {
	    // Do nothing, as we coerced the value to true/false
	} else
	    throw ArgException ("Spec '{}' unknown type {}".format
                (name, type));
    } catch (e) {
	e.setOpt (exopt);
	throw e;
    }
    
    return v2;
}

module.exports = ParamSpec;
