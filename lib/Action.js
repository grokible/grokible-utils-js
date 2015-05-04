'use strict';

var Url = require ('Url');
var Params = require ('Params');
var Check = require ('Check');
var ArgTypeException = require ('ArgTypeException');

// Provided by browserify in browser and Node.js core on backend
var http = require ('http');

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
Action.prototype.setMethod = function (method)
    { this._method = method.toLowerCase ()  }

Action.prototype.getContentType = function () { return this._contentType }
Action.prototype.setContentType = function (contentType)
    { this._contentType = contentType }

Action.prototype.getSuccessFn = function () { return this._successFn }
Action.prototype.setSuccessFn = function (successFn)
    { this._successFn = successFn }

Action.prototype.getErrorFn = function () { return this._errorFn }
Action.prototype.setErrorFn = function (errorFn) { this._errorFn = errorFn }

Action.prototype.getRequest = function () {
    return {
        host : this._url.getUrl (),
        port : this._url.getPort (),
        path : this._url.getPath (),
        method : this.getMethod (),
        withCredentials : false
    };
}

Action.prototype.clone = function () {
    return new Action ({
        url : this._url,
        method : this._method,
        contentType : this._contentType,
        successFn : this._successFn,
        errorFn : this._errorFn
    });
}

Action.prototype.exec = function (done, optPostData) {
    // Url must be defined at this point to work
    Check.hasSamePrototype (this._url, Url);

    // If method is get, there shouldn't be post data
    if (this._method === 'get')
        Check.isUndefined (optPostData);

    if (optPostData !== undefined)
        obj ['data'] = JSON.stringify (optPostData);

    var req = this.getRequest ();


    var fetch = http.request (req, function (res) {
        var result = "";
        res.on ('data', function (chunk) {
            result += chunk;
        });
        res.on ('end', function () {
            console.log ("response ....");
            console.log (result);
            done ();
        });
    });

    return fetch;
}

module.exports = Action;
