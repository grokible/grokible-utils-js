// Check.js
// A 'static' library

/**
 *  Check (library) is designed to provide foolproof, simple validation for
 *  aspects of variables and arguments.  A Check routine, by definition will
 *  throw a CheckException if the check fails.  You may also provide a
 *  different exception type that is more context relevant.  Also, if the
 *  Check function is called with bad arguments, a ArgTypeException is thrown,
 *  as we want to signal the Check didn't fail, but was called improperly.
 *  Check functions always have an optThrows argument which is by default
 *  true.  If set to false, Check will return true or false, and will not
 *  throw (except in the case of ArgTypeException).  Check functions are
 *  designed to be bombproof, so that regardless of values passed in, they
 *  themselves do not have a problem (if they do, a ArgTypeException is
 *  thrown).  If you absolutely can't throw, you should wrap a Check in
 *  a try/catch block.
 *
 *  Some of the aspects we are checking for are defined in ways to make
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
 */

define (['Describe', 'CheckException', 'ArgTypeException'],
    function (Describe, CheckException, ArgTypeException) {

    var Check = {};

    /**
     * This is equivalent to saying something is the same "class"
     */
    Check.hasSamePrototype = function (obj, constructor, optThrows, optExceptionConstructor) {
        optThrows = (typeof optThrows === 'undefined') ? true : optThrows; 
        optExceptionConstructor = optExceptionConstructor || CheckException;

        var s1 = Describe.getDescription (obj);
        var s2 = Describe.getDescription (constructor);

        if ( ! optExceptionConstructor)
            optExceptionConstructor = CheckException;

        if (obj === undefined) {
            if ( ! optThrows)
                return false;
            throw new optExceptionConstructor ("First arg (obj) is undefined, is not a " + s2);
        }

        if (obj === null) {
            if ( ! optThrows)
                return false;
            throw new optExceptionConstructor ("First arg (obj) is null, is not a " + s2);
        }


        // N.B. the following always throw because they are programming errors not checks

        if ( ! Check.isFunction (constructor, false))
            throw new ArgTypeException ("Second arg (constructor) must be a function");

        if (constructor === null)
            throw new ArgTypeException ("Second arg (constructor) is null");

        if (constructor === undefined)
            throw new ArgTypeException ("Second arg (constructor) is undefined");

        if (constructor.prototype === null)
            throw new ArgTypeException ("Second arg (constructor), prototype property is null");

        if (constructor.prototype === undefined)
            throw new ArgTypeException ("Second arg (constructor), prototype property is undefined");

        var name = "(with no name)";
        if ( ! (constructor.name === undefined))
            name = constructor.name;

        var prototype1;
        try {
            prototype1 = Object.getPrototypeOf (obj);
        } catch (e) {
            if ( ! optThrows)
                return false;
            throw new optExceptionConstructor (s1 + " has no prototype (not an object) compared to constructor '" + name + "'");            
        }

        if (prototype1 != constructor.prototype) {
            if ( ! optThrows)
                return false;
            throw new optExceptionConstructor (s1 + " has a different prototype than constructor '" + name + "'");
        }

        return true;
    }

    Check.isArray = function (obj, optThrows, optExceptionConstructor) {
        optThrows = (typeof optThrows === 'undefined') ? true : optThrows; 
        optExceptionConstructor = optExceptionConstructor || CheckException;

        if ( ! Array.isArray (obj)) {
            if ( ! optThrows)
                return false;

            var s1 = Describe.getDescription (obj);
            throw new optExceptionConstructor (s1 + " is not an Array");
        }

        return true;
    }

    Check.isInteger = function (value, optThrows, optExceptionConstructor) {
        optThrows = (typeof optThrows === 'undefined') ? true : optThrows; 
        optExceptionConstructor = optExceptionConstructor || CheckException;

        ok = true;
        if ((undefined === value) || (null === value))
            ok = false;
        else
            if ( ! (value % 1 == 0))
                ok = false;

        if ( ! ok) {
            if ( ! optThrows)
                return false;
            var s = Describe.getDescription (value);
            throw new optExceptionConstructor ("'" + s + "' is not an integer.");
        }

        return true;
    }

    /**
     * Synonym for hasSamePrototype
     */
    Check.hasClass = function (value, constructor, optThrows, optExceptionConstructor) {
        return Check.hasSamePrototype (value, constructor, optThrows, optExceptionConstructor);
    }


    /**
     * Determines whether the class is "Object" (e.g. {})
     */
    Check.hasClassOfObject = function (value, optThrows, optExceptionConstructor) {
        return Check.hasSamePrototype (value, Object, optThrows, optExceptionConstructor);
    }

    Check.isFunction = function (value, optThrows, optExceptionConstructor) {
        optThrows = (typeof optThrows === 'undefined') ? true : optThrows; 
        optExceptionConstructor = optExceptionConstructor || CheckException;

        var isFunc = !! (value && value.constructor && value.call && value.apply);

        if (isFunc)
            return true;

        var s1 = Describe.getDescription (value);

        if (optThrows)
            throw new optExceptionConstructor (s1 + " is not a function");

        return false;
    }

    /**
     * Determines whether the class is "Object" (e.g. {})
     */
    Check.instanceOf = function (value, constructor, optThrows, optExceptionConstructor) {
        optThrows = (typeof optThrows === 'undefined') ? true : optThrows; 
        optExceptionConstructor = optExceptionConstructor || CheckException;

        if ( ! Check.isFunction (constructor, false))
            throw new ArgTypeException ("Second arg (constructor) must be a function");

        if (value instanceof constructor)
            return true;

        var s1 = Describe.getDescription (value);

        var name = "(with no name)";
        if ( ! (constructor.name === undefined))
            name = constructor.name;

        if (optThrows)
            throw new optExceptionConstructor (s1 + " is not an instance of constructor '" + name + "'");

        return false;
    }

    /**
     *  Synonym for instanceOf
     */
    Check.isA = function (value, constructor, optThrows, optExceptionConstructor) {
        return Check.instanceOf (value, constructor, optThrows, optExceptionConstructor);
    }

    /**
     * Determines whether the class is "Object" (e.g. {})
     */
    Check.isObject = function (value, optThrows, optExceptionConstructor) {
        return Check.instanceOf (value, Object, optThrows, optExceptionConstructor);
    }

    return Check;
});