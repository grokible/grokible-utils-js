// Resource.js

define (['Params', 'Check'], function (Params, Check) {

    /**
     * config.scheme = http (default) | https, .host = localhost (default) | hostname
     * config.port = port | <nothing>, config.path = path (no leading /) | <nothing> 
     */ 
    var Resource = function (optConfig) {
        var config = optConfig || {};
        pm = new Params (config, this, true);

        pm.copy ('scheme', 'http');
        pm.copy ('host', 'localhost');
        pm.copy ('port');                    // todo check if number
        pm.copy ('path', "");
    };

    Resource.prototype.clone = function () {
        return new Resource ({
            scheme : this._scheme,
            host : this._host,
            port : this._port,
            path : this._path
        });
    }

    Resource.prototype.getScheme = function () { return this._scheme }
    Resource.prototype.setScheme = function (scheme) { this._scheme = scheme }

    Resource.prototype.getHost = function () { return this._host }
    Resource.prototype.setHost = function (host) { this._host = host }

    Resource.prototype.getPort = function () { return this._port }
    Resource.prototype.setPort = function (port) { Check.isInteger (port); this._port = port }

    Resource.prototype.getPath = function () { return this._path }
    Resource.prototype.setPath = function (path) { this._path = path }

    Resource.prototype.getUrl = function () {
        var s = this._scheme + "://" + this._host;
        if (this._port)
            s += ":" + this._port;
        s += "/" + this._path;
        return s;
    }

    return Resource;
});