// Params.js

define ([], function () {

    /**
     * A simple helper object which takes a config (map of values) and
     * an optional "TargetObject".  The TargetObject typically should be
     * 'this' inside a constructor.  This will be used to copy properties
     * from the config to the object.  Thus, Params can be used to set
     * properties to values (or use a supplied default if one doesn't exist).
     *
     *     var Action = function (config) {
     *         pm = new Params (config, this);
     *
     *         // sets this._method to config ['method'] or 'get'
     *         pm.copy ('method', 'get');
     *
     */
    var Params = function (config, optTargetObject) {
        this.setConfig (config);
        this.setTargetObject (optTargetObject);
    };

    Params.prototype.getConfig = function () {
        return this._config;
    }

    Params.prototype.setConfig = function (config) {
        return this._config = config;
    }

    Params.prototype.getTargetObject = function () {
        return this._targetObject;
    }

    Params.prototype.setTargetObject = function (targetObject) {
        return this._targetObject = targetObject;
    }


    /**
     * Reads from this "config" (a map, passed into constructor), and
     * if the entry (key) exists in the config, sets this on the
     * "TargetObject" set in the constructor (if one was set)
     */
    Params.prototype.copy = function (key, optDefault) {
        var v = this._config [key] ? this._config [key] : optDefault;

        if (v === undefined)
            return v;

        if (this._targetObject !== undefined) {
            // Set the property "_<key>" on the object (prefix key with underbar)

            var thisKey = "_" + key;
            this._targetObject [thisKey] = v;
        }
        return v;
    }

    return Params;
});