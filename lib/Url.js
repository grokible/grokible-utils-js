// Url.js

define (['Params', 'Check'], function (Params, Check) {

    /**
     * config.scheme = http (default) | https, .host = localhost (default) | hostname
     * config.port = port | <nothing>, config.path = path (no leading /) | <nothing> 
     */ 
    var Url = function (optConfig) {
        var config = optConfig || {};
        pm = new Params (config, this, true);

        pm.copy ('scheme', 'http');
        pm.copy ('host', 'localhost');
        pm.copy ('port');                    // todo check if number
        pm.copy ('path', "");
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
    Url.prototype.setPort = function (port) { Check.isInteger (port); this._port = port }

    Url.prototype.getPath = function () { return this._path }
    Url.prototype.setPath = function (path) { this._path = path }

    Url.prototype.getUrl = function () {
        var s = this._scheme + "://" + this._host;
        if (this._port)
            s += ":" + this._port;
        s += "/" + this._path;
        return s;
    }

    return Url;
});