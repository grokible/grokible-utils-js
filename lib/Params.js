'use strict';

/** 
 *  Params Class
 *  A simple helper object which takes a config (map of values) and
 *  an optional "TargetObject".  The TargetObject typically should be
 *  'this' inside a constructor.  This will be used to copy properties
 *  from the config to the object.  Thus, Params can be used to set
 *  properties to values (or use a supplied default if one doesn't exist).
 *
 *  N.B. this assumes object properties get an additional leading underscore
 *  (so when copied from config without leading underscore, will get one).
 *
 *      var Action = function (config) {
 *          pm = new Params (config, this);
 *
 *          // sets this._method to config ['method'] or 'get'
 *          pm.copy ('method', 'get');
 */

var Options = require ('Options');
var Check = require ('Check');
var ArgTypeException = require ('ArgTypeException');

/** Constructor
 *  optTargetObject (default:undefined) - sets target object so calls to
 *      copy(), will set the value on "_<Prop>".
 *  optUseSettor (default:false) - will call optTargetObject.set<Prop>(v)
 *      to copy the value rather than directly setting optTargetObject._<Prop> 
 */
var Params = function (config, optTargetObject, optUseSettor) {
    this.setConfig (config);
    this.setTargetObject (optTargetObject);
    this._useSettor = optUseSettor === undefined ? false : optUseSettor;
};

Params.prototype.getConfig = function () { return this._config }
Params.prototype.setConfig = function (config) { this._config = config }

Params.prototype.getTargetObject = function () { return this._targetObject }
Params.prototype.setTargetObject = function (targetObject)
    { this._targetObject = targetObject }

/**
 * Reads from this "config" (a map, passed into constructor), and
 * if the entry (key) exists in the config, sets this on the
 * "TargetObject" set in the constructor (if one was set).
 * optCheckFn needs to get the value from the pm[key] and verify it.
 */
Params.prototype.copy = function (key, optDefault, options) {
    if (options === undefined)
        options = {};

    // Make sure options is a map, and correct keys are in it
    Check.isMap (options, {
        exception : ArgTypeException,
        message : "Params.copy 3rd arg (options) must be a map."
    });

    Check.keysInArray (options, ['useSettor', 'checkFunction', 'message'], {
        exception : ArgTypeException,
        message : "Params.copy 3rd arg (options) - bad option passed."
    });

    var useSettor = Options.get ('useSettor', options, this._useSettor);
    var checkFn = Options.get ('checkFunction', options);

    var checkOptions = { exception : ArgTypeException };
    Options.getAndSet ('message', options, checkOptions);

    var v = Options.get (key, this._config, optDefault);

    if (checkFn)
        checkFn.call (this, v, checkOptions);

    if (v === undefined)
        return v;

    if (this._targetObject !== undefined) {
        // Set the property "_<key>" on the object (prefix key with underbar)

        if ( ! useSettor) {
            var thisKey = "_" + key;
            this._targetObject [thisKey] = v;
        } else {
            var upperKey = key [0].toUpperCase () + key.slice (1);
            var setMethod = "set" + upperKey;
            this._targetObject [setMethod](v);
        }
    }

    return v;
}

module.exports = Params;
