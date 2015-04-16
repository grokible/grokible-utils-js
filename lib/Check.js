// Check.js
// A 'static' library

define (['Describe', 'CheckException', 'ProgrammingError'],
    function (Describe, CheckException, ProgrammingError) {

    var Check = {};

    Check.hasSamePrototype = function (obj, constructor, optExceptionConstructor) {
        var s1 = Describe.getDescription (obj);
        var s2 = Describe.getDescription (constructor);

        if ( ! optExceptionConstructor)
            optExceptionConstructor = CheckException;

        if (obj === undefined)
            throw new optExceptionConstructor ("First arg (obj) is undefined, is not a " + s2);

        if (obj === null)
            throw new optExceptionConstructor ("First arg (obj) is null, is not a " + s2);

        if (constructor === null)
            throw new ProgrammingError ("Second arg (constructor) is null");

        if (constructor === undefined)
            throw new ProgrammingError ("Second arg (constructor) is undefined");

        if (constructor.prototype === null)
            throw new ProgrammingError ("Second arg (constructor), prototype property is null");

        if (constructor.prototype === undefined)
            throw new ProgrammingError ("Second arg (constructor), prototype property is undefined");

        var name = "(with no name)";
        if ( ! (constructor.name === undefined))
            name = constructor.name;

        if (Object.getPrototypeOf (obj) != constructor.prototype)
            throw new optExceptionConstructor (s1 + " has a different prototype than constructor '" + name + "'");
    }

    Check.isArray = function (obj, optExceptionConstructor) {

        if ( ! optExceptionConstructor)
            optExceptionConstructor = CheckException;

        if ( ! Array.isArray (obj)) {
            var s1 = Describe.getDescription (obj);
            throw new optExceptionConstructor (s1 + " is not an Array");
        }
    }

    Check.isInteger = function (value, optExceptionConstructor) {
        if ( ! optExceptionConstructor)
            optExceptionConstructor = CheckException;

        ok = true;
        if ((undefined === value) || (null === value))
            ok = false;
        else
            if ( ! (value % 1 == 0))
                ok = false;

        if ( ! ok) {
            var s = Describe.getDescription (value);
            throw new optExceptionConstructor ("'" + s + "' is not an integer.");
        }
    }

    return Check;
});