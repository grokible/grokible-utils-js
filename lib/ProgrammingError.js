// ProgrammingError.js

define (['Inherits', 'Exception'], function (Inherits, Exception) {

    /**
     * Exception thrown when there is a general programming error, such as a
     * function called with bad values.
     */
    var ProgrammingError = function ProgrammingError () {
        var obj = Inherits.superCreateNewIgnored (ProgrammingError, Exception, arguments);
        obj.name = obj.constructor.name;    // Set error class 'name' property
        return obj;
    }

    Inherits.setParentClass (ProgrammingError, Exception);

    return ProgrammingError;
});