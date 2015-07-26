'use strict';

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

var arrayForEachPolyfill = function (callback, thisArg) {

    var T, k;

    if (this == null)
        throw new TypeError (' this is null or not defined');

    // 1. Let O be the result of calling ToObject passing the |this| value
    //    as the argument.

    var O = Object (this);

    // 2. Let lenValue be the result of calling the Get internal method of
    //    O with the argument "length".
    // 3. Let len be ToUint32(lenValue).

    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    //    See: http://es5.github.com/#x9.11

    if (typeof callback !== "function")
        throw new TypeError (callback + ' is not a function');

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
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
    // 8. return undefined
};

var extend = function (obj, src) {
    for (var key in src)
        if (src.hasOwnProperty (key)) obj [key] = src [key];

    return obj;
}

module.exports.arrayForEach = arrayForEachPolyfill;
module.exports.extend = extend;



