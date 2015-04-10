// Resource.js

define (['Params'], function (Params) {

    /**
     * config.scheme = http (default) | https, .host = localhost (default) | hostname
     * config.port = port | <nothing>, config.path = path (no leading /) | <nothing> 
     */ 
    var Resource = function (config) {
        pm = new Params (config, this);

        pm.copy ('scheme', 'http');        // todo check if http or https?
        pm.copy ('host', 'localhost');
        pm.copy ('port');                    // todo check if number
        pm.copy ('path', "");                // should I url encode this?.  If so we need some util functions.
    };

    Resource.prototype.clone = function () {
        return new Resource ({
            scheme : this._scheme,
            host : this._host,
            port : this._port,
            path : this._path
        });
    }

    Resource.prototype.getUrl = function () {
        var s = this._scheme + "://" + this._host;
        if (this._port)
            s += ":" + this._port;
        s += "/" + this._path;
        return s;
    }

    return Resource;
});