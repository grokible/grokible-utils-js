'use strict';

var Inherits = require ('Inherits');
var Check = require ('Check');
var ArgException = require ('ArgException');
var ArgTypeException = require ('ArgTypeException');
var QueryParamException = require ('./grokible.queryParamException');

var format = require ('string-format').extend (String.prototype);

var ParamSpec = function (args, spec, opt) {
    var obj = Inherits.superCreateNewIgnored (ParamSpec, Object);
    obj._args = args;
    obj._spec = spec;
    obj._opt = opt;
    return obj;
};

ParamSpec.prototype.getArgs = function () { return this._args }
ParamSpec.prototype.setArgs = function (args) { this._args = args }

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
        throw exCtor ("No argument found named '" + name + "'", exopt);

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
	    msg = "Failed attempting to convert string value '" + v +
                "' to type " + type;
	    throw exCtor (msg, exopt);
        }
    } else if (v_type === 'undefined') {
	if (type === 'flag')
	    v2 = name in this._args;
	else
	    throw ArgException ("Undefined value only allowed on 'flag' " +
	        "not type=" + type, exopt);
    } else {
	// not a string arg, so no coercion
        v2 = v;
    }

    // v2 now holds the typed thing, check it
    msg = "Expected query param '" + name + "=" + arg + "' to be a " +
        type + ".";

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
	    throw ArgException ("Spec '" + name + "' unknown type " + type);
    } catch (e) {
	e.setOpt (exopt);
	throw e;
    }
    
    return v2;
}

module.exports = ParamSpec;
