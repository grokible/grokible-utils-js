'use strict';

var Check = require ('Check');
var Params = require ('Params');

/**
 * config.scheme = http (default) | https, .host = localhost (def) | hostname
 * config.port = port | <none>, config.path = path (no leading /) | <none> 
 */
var Url = function (optConfig) {
    var config = optConfig || {};
    var pm = new Params (config, this, true);

    pm.copy ('scheme', 'http');
    pm.copy ('host', 'localhost');
    pm.copy ('port');                    // todo check if number
    pm.copy ('path', "/");
};

Url.prototype.clone = function () {
    return new Url ({
        scheme : this._scheme,
        host : this._host,
        port : this._port,
        path : this._path
    });
}

Url.prototype.getScheme = function () { return this._scheme }
Url.prototype.setScheme = function (scheme) { this._scheme = scheme }

Url.prototype.getHost = function () { return this._host }
Url.prototype.setHost = function (host) { this._host = host }

Url.prototype.getPort = function () { return this._port }
Url.prototype.setPort = function (port) {
    Check.isInteger (port); this._port = port
}

Url.prototype.getPath = function () { return this._path }
Url.prototype.setPath = function (path) { this._path = path }

Url.prototype.getUrl = function () {
    var s = this._scheme + "://" + this._host;
    if (this._port)
        s += ":" + this._port;
    s += this._path;
    return s;
}

module.exports = Url;
