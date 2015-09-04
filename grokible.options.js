
var Options = {};

/**
 *  A 'static' function.  Returns the attribute from the options (map)
 *  if it exists, else returns optDefault.
 */
Options.get = function (key, options, optDefault) {
    return key in options ? options [key] : optDefault;
}

Options.setIfNotSet = function (key, value, options) {
    if (key in options)
        return;
    options [key] = value;
}

/**
 * Copies from one to another, if exists or optDefault not undefined
 */
Options.getAndSetIfNotSet = function (key, optionsFrom, optionsTo,
    optDefault) {

    var v = Options.get (key, optionsFrom, optDefault);
    Options.setIfNotSet (key, v, optionsTo);
}

Options.getAndSet = function (key, optionsFrom, optionsTo, optDefault) {
    var v = Options.get (key, optionsFrom, optDefault);
    optionsTo [key] = v;
}

/**
 *  Simple copy routine.  Copies one-level map, with simple vars, but
 *  arrays, maps will get ref-copied, not value copied.
 */
Options.copy = function (options) {
    var tmp = {};
    var keys = Object.keys (options),
        len = keys.length;
    for (var i = 0 ; i < len ; i++) {
        var k = keys [i];
        tmp [k] = options [k];
    }

    return tmp;
}

/**
 *  Computes the 'merge' of the two options, by applying options1 to a copy of
 *  options2 and returning it (options1 has precedence).
 */
Options.mergeTo = function (options1, options2) {
    var options = Options.copy (options2);

    // Iter over options1 and override in options2
    var keys = Object.keys (options1),
        len = keys.length;
    for (var i = 0 ; i < len ; i++) {
        var k = keys [i];
        options [k] = options1 [k];
    }

    return options;
}

module.exports = Options;
