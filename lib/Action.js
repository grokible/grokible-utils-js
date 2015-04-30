'use strict';

var Url = require ('Url');
var Params = require ('Params');
var Check = require ('Check');
var ArgTypeException = require ('ArgTypeException');

var Action = function (config) {
    Check.isObject (config, true, ArgTypeException);
    var pm = new Params (config, this, true);

    pm.copy ('url');   // todo - check that this is a Url?
                       // value.constructor == Url => cool
                       // Check.isConstructor => how do I bind a value
                       // and generate a new function?
                       // N.B. functions already have a "bind()"
                       // method bind (undefined, x) - first is 'this'
    pm.copy ('method', 'get');
    pm.copy ('contentType', 'application/json; charset=utf-8');
    pm.copy ('successFn', null);          // todo default success?
    pm.copy ('errorFn', null);            // todo default error
};

Action.prototype.getUrl = function () { return this._url }
Action.prototype.setUrl = function (url) {
    if ( ! (url === undefined || url === null))
        Check.hasSamePrototype (url, Url, ArgTypeException);
        
    this._url = url;
}

Action.prototype.getMethod = function () { return this._method }
Action.prototype.setMethod = function (method) { this._method = method }

Action.prototype.getContentType = function () { return this._contentType }
Action.prototype.setContentType = function (contentType)
    { this._contentType = contentType }

Action.prototype.getSuccessFn = function () { return this._successFn }
Action.prototype.setSuccessFn = function (successFn)
    { this._successFn = successFn }

Action.prototype.getErrorFn = function () { return this._errorFn }
Action.prototype.setErrorFn = function (errorFn) { this._errorFn = errorFn }

Action.prototype.clone = function () {
    return new Action ({
        url : this._url,
        method : this._method,
        contentType : this._contentType,
        successFn : this._successFn,
        errorFn : this._errorFn
    });
}

/**
 * Execute rest method, on url.  optData = object body (e.g. post body)
 */
Action.prototype.exec = function (optData) {

    // Url must be defined at this point to work

    Check.hasSamePrototype (this._url, Url);

    var obj = {
        url : this._url.getUrl (),
        type : this._method,
        contentType : this._contentType,
        success : this._successFn,
        error : this._errorFn
    };
    
    if (optData !== undefined)
        obj ['data'] = JSON.stringify (optData);
    $.ajax (obj);
}

module.exports = Action;
