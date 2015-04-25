// ArgTypeException.js

define (['Inherits', 'Exception'], function (Inherits, Exception) {

    /**
     *  Argument Type violates expected call to function (A programming error we
     *  detect at the top of a function call, when validating parameters).
     */
    var ArgTypeException = function ArgTypeException () {
        var obj = Inherits.superCreateNewIgnored (ArgTypeException, Exception, arguments);
        obj.name = obj.constructor.name;    // Set error class 'name' property
        return obj;
    }

    Inherits.setParentClass (ArgTypeException, Exception);

    return ArgTypeException;
});