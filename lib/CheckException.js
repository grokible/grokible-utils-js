// CheckException.js

define (['Inherits', 'Exception'], function (Inherits, Exception) {

    /**
     * Exception thrown from Check library, which is useful for testing input
     * arguments to functions.
     */
    var CheckException = function CheckException () {
        var obj = Inherits.superCreateNewIgnored (CheckException, Exception, arguments);
        obj.name = obj.constructor.name;    // Set error class 'name' property
        return obj;
    }

    Inherits.setParentClass (CheckException, Exception);

    return CheckException;
});