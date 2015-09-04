
/**
 *  A static library.
 *  Check (library) is designed to provide foolproof, simple validation for
 *  aspects of variables and arguments.  A Check routine, by definition will
 *  throw a CheckException if the check fails.  Thus, a CheckException may
 *  be thought of as a kind of true/false value.  It's useful to throw
 *  an exception when this is false, to program in the "fail fast" mode,
 *  which catches errors early.
 *
 *  Other exception types:
 *  ----------------------
 *  The other type of exception, besides CheckException, thrown by this
 *  library is ArgTypeException, which means that a programming error
 *  was made in calling this library (or there could be a bug in this library).
 *  ArgTypeException means the true/false value is not legitimate because
 *  the test couldn't be conducted properly.  For example "inArray" test
 *  will throw ArgTypeException if the second argument is not an array.
 *  This is not a bona fide true/false value (CheckException) because
 *  the second arg was not an array, and the test can't be carried out
 *  (and this is, of course, a programming error).
 *
 *  It is recommended that you convert CheckExceptions to your own
 *  type.  For example if you are checking arguments at the start of
 *  a function call, you could convert the CheckException to
 *  ArgTypeException.  The following code does that, as well as
 *  provides a better message in the exception.
 *
 *      Check.isMap (mapArgument1, {
 *          exception : ArgTypeException,
 *          message : "Params.copy 3rd arg (options) must be a map."
 *      });
 *  
 *  Thus, if you follow this convention, a CheckException is really just
 *  an "unwrapped failure".  This is fine, but you may want to examine
 *  the failure, and change exception and message to be more helpful.
 * 
 *  About the checks:
 *  -----------------
 *  Some of the qualities we are checking for are defined in ways to make
 *  coding less ambiguous.  Thus, we take some liberties to slightly
 *  change what might be considered a "native Javascript" check.  A
 *  perfect example of this is "null" being an Object (Check doesn't
 *  consider this to be true).
 *
 *  Note for the purpose of OOP, the prototype is considered the "class".
 *  In calls with objects that have an argument named "constructor",
 *  the intent is to pass the constructor, since that has a name that
 *  can be used.  Passing an object with a prototype will generate a
 *  ArgTypeException.
 *
 *  Making new checks:
 *  ------------------
 *  Can be done by writing a truthFunction.  This returns no value, but
 *  will throw a CheckException on a valid "false" value, and other
 *  exceptions on some type of programming error (e.g. ArgTypeException).
 *  The wrapper function Check.twoArgTruth () will examine the type of
 *  the exception to decide what to do.
 */

var Options = require ('grokible.options.js');
var Describe = require ('grokible.describe.js');

var Exceptions = require ('grokible.exceptions.js');
var CheckException = Exceptions.CheckException;
var ArgTypeException = Exceptions.ArgTypeException;

var Check = {};

/**
 *  Generic wrapper function for Check functions.  truthFunction must
 *  throw an exception if the test fails.  If it fails on testing the
 *  value, it must throw a CheckException, otherwise any other
 *  exception thrown is considered a programming error and is passed out.
 *  Thus, even if options = { throws : false }, we will always throw
 *  programming exceptions out, but true/false results (which are
 *  expressed as CheckExceptions), do not throw if throws = false.
 */
Check.twoArgTruth = function (obj, obj2, truthFunction, options) {
    if (options === undefined)
        options = {};

    // Is options a Map?
    try {
        Check._instanceOf (options, Object);
    } catch (e) {
        throw new ArgTypeException ("Fourth arg (options) must be a map.  " +
            "It is a " + Describe.get (options) + ".");
    }

    try {
        Check._keysInArray (options, ['throws', 'exception', 'message']);
    } catch (e) {
        throw new ArgTypeException ("Fourth arg (options) must be a map.  " +
            "It is a " + Describe.get (options) + ".");
    }

    var throws = Options.get ('throws', options, true);
    var exceptionCtor = Options.get ('exception', options);
    var message = Options.get ('message', options, "");

    var exc;
    try {
        truthFunction (obj, obj2);
    } catch (e) {
        exc = e;
    }

    // truthFunctions are expected to throw on false or error

    if (exc) {
        // We will still throw if this is a programming error (i.e.
        // truthFunction () throws something that is not a CheckException

        var excIsCheckException = Object.getPrototypeOf (exc) ===
            CheckException.prototype;

	var excCtorDefined = typeof (exceptionCtor) === "function";

        if (throws || ! excIsCheckException) {
	    if (message.length == 0) {
		message = "" + exc;
                message += "  ArgType=" + Describe.get (obj) + ".";
            }


            // If truthFunction throws a CheckException, we need to take
            // its message and enhance it (i.e. with the Arg description),
            // otherwise we rethrow.

            if (excIsCheckException) {
                if (excCtorDefined)
                    throw new exceptionCtor (message);
                throw new CheckException (message);
            }

            // else rethrow
            throw exc;
        }

        return false;
    }

    return true;
}

/**
 * This is equivalent to saying something is the same "class"
 */
Check._hasSamePrototype = function (value, constructor) {
    if (value === undefined || value === null)
        throw new CheckException ("First arg (value) is undefined or null");

    if (constructor === undefined || constructor === null)
        throw new ArgTypeException ("Second arg (constructor) is " +
            "undefined or null");
    
    try {
        Check._isFunction (constructor);
    } catch (e) {
        throw new ArgTypeException ("Second arg (constructor) is not a " +
            "function");
    }

    if (constructor.prototype === null)
        throw new ArgTypeException ("Second arg (constructor), prototype " +
            "property is null");

    if (constructor.prototype === undefined)
        throw new ArgTypeException ("Second arg (constructor), prototype " +
            "property is undefined");

    var name = "(with no name)";
    if ( ! (constructor.name === undefined))
        name = constructor.name;

    var prototype1;

    try {
        prototype1 = Object.getPrototypeOf (value);
    } catch (e) {
        throw new CheckException (Describe.get (value) +
            " has no prototype (not an object) compared to constructor '" +
            name + "'");            
    }

    if (prototype1 != constructor.prototype)
        throw new CheckException (Describe.get (value) +
            " has a different prototype than constructor '" + name + "'");
}

Check.hasSamePrototype = function (value, constructor, options) {
    return Check.twoArgTruth (value, constructor, Check._hasSamePrototype,
        options);
}

Check._isArray = function (value) {
    if ( ! Array.isArray (value))
        throw new CheckException ("The value is not an array.");
}

Check.isArray = function (value, options) {
    return Check.twoArgTruth (value, null, Check._isArray, options);
}

Check._inArray = function (value, arr) {
    if (arr.indexOf (value) < 0)
        throw new CheckException ("The value '" + value + "' is not " +
            "in the array.");
}

Check.inArray = function (value, arr, options) {
    return Check.twoArgTruth (value, arr, Check._inArray, options);
}

Check._keysInArray = function (value, arr) {
    var keys = Object.keys (value),
        len = keys.length;
    for (var i = 0 ; i < len ; i++) {
        var k = keys [i];
        if (arr.indexOf (k) < 0)
            throw new CheckException ("Key '" + k + "' not found in array.");
    }
}

Check.keysInArray = function (value, arr, options) {
    return Check.twoArgTruth (value, arr, Check._keysInArray, options);
}

Check._inMapAndNotEmpty = function (value, map) {
    try {
        Check._isMap (map);
    } catch (e) {
        throw new ArgTypeException ("Second arg is not a map.");
    }

    if ( ! (value in map))
        throw new CheckException ("Value (key) '" + value + "' is not in " +
            "map.");

    var v = map [value];
    if (v === undefined || v === null)
        throw new CheckException ("Value (key) '" + value + "' is in " +
            "map, but is empty (null or undefined).");
}

Check.inMapAndNotEmpty = function (value, map, options) {
    return Check.twoArgTruth (value, map, Check._inMapAndNotEmpty, options);
}

Check._isString = function (value) {
    if ((undefined === value) || (null === value))
        throw new CheckException ("Value '" + value + "' is not a string.");

    if ( ! (typeof value === 'string'))
        throw new CheckException ("Value '" + value + "' is not a string");
}

Check.isString = function (value, options) {
    return Check.twoArgTruth (value, undefined, Check._isString, options);
}

Check._isNumber = function (value) {
    if ((undefined === value) || (null === value))
        throw new CheckException ("Value '" + value + "' is not a number.");

    if ( ! (typeof value === 'number'))
        throw new CheckException ("Value '" + value + "' is not a number.");

    if (isNaN (value))
        throw new CheckException ("Value '" + value + "' is not a number " +
            "(NaN).");
}

Check.isNumber = function (value, options) {
    return Check.twoArgTruth (value, undefined, Check._isNumber, options);
}

Check._isInteger = function (value) {
    if ((undefined === value) || (null === value))
        throw new CheckException ("Value '" + value + "' is not an " +
            "integer.");

    if ( ! (value % 1 == 0))
        throw new CheckException ("Value '" + value + "' is not an " +
            "integer.");
}

Check.isInteger = function (value, options) {
    return Check.twoArgTruth (value, undefined, Check._isInteger, options);
}


Check._isUndefined = function (value) {
    if ( ! (undefined === value))
        throw new CheckException ("Value '" + value + "' is not undefined.");
}

Check.isUndefined = function (value, options) {
    return Check.twoArgTruth (value, undefined, Check._isUndefined, options);
}

Check._isDefined = function (value) {
    if (undefined === value)
        throw new CheckException ("Value '" + value + "' must be defined.");
}

Check.isDefined = function (value, options) {
    return Check.twoArgTruth (value, undefined, Check._isUndefined, options);
}


/**
 * Synonym for hasSamePrototype
 */
Check.hasClass = function (value, constructor, options) {
    return Check.hasSamePrototype (value, constructor, options);
}


/**
 * Determines whether the class is "Object" (e.g. {})
 */
Check.hasClassOfObject = function (value, options) {
    return Check.hasSamePrototype (value, Object, options);
}

Check._isFunction = function (value) {
    var isFunc = !! (value && value.constructor && value.call && value.apply);

    if ( ! isFunc)
        throw new CheckException ("Value is not a function.");
}

Check.isFunction = function (value, options) {
    return Check.twoArgTruth (value, undefined, Check._isFunction, options);
}

/**
 * Determines whether the class is "Object" (e.g. {})
 */

Check._instanceOf = function (value, constructor) {
    try {
        Check._isFunction (constructor);
    } catch (e) {
        throw new ArgTypeException ("Second arg (constructor) must be " +
            "a function");
    }

    if ( ! (value instanceof constructor))
        throw new CheckException ("Value '" + Describe.get (value) + "' is " +
            "not an instanceof constructor '" + Describe.get (constructor) +
            "'.");
}

Check.instanceOf = function (value, constructor, options) {
    return Check.twoArgTruth (value, constructor, Check._instanceOf, options);
}


/**
 *  Synonym for instanceOf
 */
Check.isA = function (value, constructor, options) {
    return Check.instanceOf (value, constructor, options);
}

/**
 * Determines whether the class is "Object" (e.g. {})
 */
Check.isObject = function (value, options) {
    return Check.instanceOf (value, Object, options);
}

/**
 * A map is an object in Javascript.  The intent here is to determine
 * whether something is an object literal.
 */
Check._isMap = function (value) {
    Check._instanceOf (value, Object);
}

Check.isMap = function (value, options) {
    return Check.twoArgTruth (value, Object, Check._isMap, options);
}

module.exports = Check;
