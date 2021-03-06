
/**
 * Polyfill taken from:
 *     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference\
 *     /Global_Objects/Array/forEach
 *
 * To use as polyfill:
 *
 * if ( ! Array.prototype.forEach)
 *     Array.prototype.forEach =
 *         require ('grokible.arrayForEachPolyfill.js').ArrayForEach;
 */

var arrayForEach = function (callback, thisArg) {

    var T, k;

    if (this == null)
        throw new TypeError (' this is null or not defined');

    var O = Object (this);
    var len = O.length >>> 0;

    if (typeof callback !== "function")
        throw new TypeError (callback + ' is not a function');

    if (arguments.length > 1)
        T = thisArg;

    k = 0;
    while (k < len) {
        var kValue;
        if (k in O) {
            kValue = O[k];
            callback.call (T, kValue, k, O);
        }
        k++;
    }
};

/* Set polyfill on Array forEach */
if ( ! Array.prototype.forEach) {
    Array.prototype.forEach = arrayForEach;
}

var extend = function (targetObj, srcDict) {
    for (var k in srcDict)
        if (srcDict.hasOwnProperty (k))
            targetObj [k] = srcDict [k];

    return targetObj;
}

/**
 * arrOfKeys is an array of names.  Creates a copy and selects the properties.
 * If missing, and cbMissing defined, will return undefined.
 */
var select = function (srcDict, arrOfKeys, cbMissing) {
    var ok = true;
    var rv = {};
    arrOfKeys.forEach (function (k) {
        if (srcDict.hasOwnProperty (k))
            rv [k] = srcDict [k];
        else if (cbMissing) {
            var msg = "Missing key = '" + k + "'";
            /* does not work: */
            /*
            if (cbMissing instanceof Error) {
                console.log ("in cbMissing, instanceof Error");
                throw new cbMissing (msg);
            } else
            */
            if (typeof cbMissing === 'function')
                cbMissing (k);
            else
                throw new Error (msg);
        }
    });

    return ok ? rv : undefined;
}

/**
 * Shallow compare of 2 arrays.
 */
var arraysAreIdentical = function (arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;

    for (var i = 0, len = arr1.length; i < len; i++) {
        if (arr1 [i] !== arr2 [i])
            return false;
    }

    return true; 
}

/**
 * Shallow compare of 2 dictionaries.
 */
var dictsAreIdentical = function (dict1, dict2) {
    if (Object.keys (dict1).length != Object.keys (dict2).length)
        return false;

    for (var p in dict1) {
        if (dict1.hasOwnProperty (p))
            if ( ! (p in dict2 && dict2 [p] === dict1 [p]))
                return false;
    }

    return true;
}

/**
 * Returns true if has dict has exact same keys as in arrOfKeys, otherwise
 * false.  If cbMissing and/or cbExtra defined, will call these with the
 * missing and extra key, resp.
 */
var hasIdenticalKeys = function (dict, arrOfKeys, cbMissing, cbExtra) {
    var k, keyDict = {};
    var same = true;
    for (var i = 0, len = arrOfKeys.length; i < len; i++) {
        k = arrOfKeys [i];
        keyDict [k] = 1;
        if ( ! (k in dict))
            if (cbMissing) {
                cbMissing (k);
                same = false;
            }
    }

    /* in dict but not in array */
    for (var p in dict) {
        if (dict.hasOwnProperty (p) && ( ! (p in keyDict))) {
            if (cbExtra)
                cbExtra (p);
            same = false;
        }
    }

    return same;
}



module.exports.dictsAreIdentical = dictsAreIdentical;
module.exports.hasIdenticalKeys = hasIdenticalKeys;
module.exports.extend = extend;
module.exports.select = select;

module.exports.arraysAreIdentical = arraysAreIdentical;
module.exports.arrayForEach = arrayForEach;

