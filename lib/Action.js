// Action.js

define (['jquery', 'Resource', 'Params'], function ($, Resource, Params) {

    var Action = function (config) {
        pm = new Params (config, this, true);

        pm.copy ('resource');                 // todo - check that this is a Resource?
                                              // value.constructor == Resource => cool
                                              // Check.isConstructor => how do I bind a value and generate a new function?
                                              // N.B. functions already have a "bind()" method bind (undefined, x) - first is 'this'
        pm.copy ('method', 'get');
        pm.copy ('contentType', 'application/json; charset=utf-8');
        pm.copy ('successFn', null);          // todo default success?
        pm.copy ('errorFn', null);            // todo default error
    };

    Action.prototype.getResource = function () { return this._resource }
    Action.prototype.setResource = function (resource) { this._resource = resource }

    Action.prototype.getMethod = function () { return this._method }
    Action.prototype.setMethod = function (method) { this._method = method }

    Action.prototype.getContentType = function () { return this._contentType }
    Action.prototype.setContentType = function (contentType) { this._contentType = contentType }

    Action.prototype.clone = function () {
        return new Action ({
            resource : this._resource,
            method : this._method,
            contentType : this._contentType,
            successFn : this._successFn,
            errorFn : this._errorFn
        });
    }

    /**
     * Execute rest method, on resource (url).  optData = object body (e.g. post body)
     */
    Action.prototype.exec = function (optData) {

        var obj = {
            url : this._resource.getUrl (),
            type : this._method,
            contentType : this._contentType,
            success : this._successFn,
            error : this._errorFn
        };
        
        if (optData !== undefined)
            obj ['data'] = JSON.stringify (optData);
        $.ajax (obj);
    }

    return Action;
});