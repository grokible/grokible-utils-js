// Describe.js

var Describe = {};


/**
 * A bulletproof function for returning a text description of what
 * a thing (usually an argument passed to a function) is, for use
 * in error messages.  We don't want this function to throw an
 * exception on a null, or on an object without a constructor or
 * anything else (since we are already error handling).  We also correct
 * some Javascript design errors (typeof null === object)
*/
Describe.getDescription = function (thing) {
    var s = typeof thing;
        
    if ( ! (s === "object"))
        return s;

    if (thing === undefined)
        return "undefined";

    // N.B. Javascript typeof null === "object", which is terrible.
    if (thing === null)
        return "null";

    // If the object has issues, we will still allow it to be an Object,
    // but we must protect against reading an undefined property

    // N.B. If uglify has been performed, this will not be useful as
    //      the names are shortened.

    if ( ! thing.constructor)
        return "Object";

    if ( ! thing.constructor.name)
        return "Object";

    return thing.constructor.name;
};

Describe.get = function (thing) {
    return Describe.getDescription (thing);
}

module.exports = Describe;
