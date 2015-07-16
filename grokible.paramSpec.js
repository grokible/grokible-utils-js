'use strict';

var Inherits = require ('Inherits');
var Check = require ('Check');
var ArgException = require ('ArgException');
var ArgTypeException = require ('ArgTypeException');
var QueryParamException = require ('QueryParamException');

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
    var exCtor;

    if (this._opt && ('exception' in this._opt))
	exCtor = this._opt ['exception'];
    else
	exCtor = ArgException;

    if (name in this._spec)
	spec = this._spec [name];
    else
	throw exCtor ("No spec name='" + name + "' in ParamSpec");

    if ('default' in spec)
        v = spec ['default'];

    if (name in this._args) {
	arg = this._args [name];
	v = arg;
    }

    if (v === undefined)
        throw exCtor ("No argument found named '" + name + "'");

    type = ('type' in spec) ? spec ['type'] : 'string';
    v_type = typeof v;

    // string may be coerced to any other type
    if (v_type === 'string') {
        try {
            if (type === 'string') {
	        v2 = v;
            } else if (type === 'number')
                v2 = parseFloat (v);
            else if (type === 'integer')
                v2 = parseInt (v);
        } catch (e) {
	    msg = "Failed attempting to convert string value '" + v +
                "' to type " + type;
	    throw new exCtor (msg);
        }
    } else {
	// not a string arg, so no coercion
        v2 = v;
    }


    // v2 now holds the typed thing, check it
    if (type === 'string') {
        Check.isString (v2, { exception: exCtor,
            message: "Expected query param '" + name + "=" + arg +
                "' to be a string." });
    } else if (type === 'number') {
        Check.isNumber (v2, { exception: exCtor,
            message: "Expected query param '" + name + "=" + arg +
                "' to be a number." });
    } else if (type === 'integer') {
        Check.isInteger (v2, { exception: exCtor,
            message: "Expected query param '" + name + "=" + arg +
                "' to be an integer." });
    } else {
	throw ArgException ("Spec name='" + name + "' has unknown type " +
            type);
    }

    return v2;
}

module.exports = ParamSpec;
