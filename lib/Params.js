// Params.js

define ([], function () {

    /** Params Class
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

    /** Constructor
     *  optTargetObject (default:undefined) - sets target object so calls to
     *      copy(), will set the value on "_<Property>".
     *  optUseSettor (default:false) - will call optTargetObject.set<Property>(v)
     *      to copy the value rather than directly setting optTargetObject._<Property> 
     */
    var Params = function (config, optTargetObject, optUseSettor) {
        this.setConfig (config);
        this.setTargetObject (optTargetObject);
        this._useSettor = optUseSettor === undefined ? false : optUseSettor;
    };

    Params.prototype.getConfig = function () { return this._config }
    Params.prototype.setConfig = function (config) { this._config = config }

    Params.prototype.getTargetObject = function () { return this._targetObject }
    Params.prototype.setTargetObject = function (targetObject) { this._targetObject = targetObject }

    /**
     * Reads from this "config" (a map, passed into constructor), and
     * if the entry (key) exists in the config, sets this on the
     * "TargetObject" set in the constructor (if one was set)
     */
    Params.prototype.copy = function (key, optDefault, optUseSettor) {
        var useSettor = this._useSettor;
        if ( ! (optUseSettor === undefined))
            useSettor = optUseSettor;
            
        var v = this._config [key] ? this._config [key] : optDefault;

        if (v === undefined)
            return v;

        if (this._targetObject !== undefined) {
            // Set the property "_<key>" on the object (prefix key with underbar)

            if ( ! useSettor) {
                var thisKey = "_" + key;
                this._targetObject [thisKey] = v;
            } else {
                upperKey = key [0].toUpperCase () + key.slice (1);
                var setMethod = "set" + upperKey;
                this._targetObject [setMethod](v);
            }
        }

        return v;
    }

    return Params;
});