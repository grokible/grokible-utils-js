// Exception.js - OOP lib, new-less constructor

define (['Inherits'], function (Inherits) {

    /**
     * An Exception object that inherits from Error.  Note we use superCreate ()
     * which will allow the ctor to be called without 'new'
     */

    var Exception = function Exception () {
        var obj = Inherits.superCreateNewIgnored (Exception, Error, arguments);
        obj.name = obj.constructor.name;    // Set error class 'name' property
        return obj;
    };

    Inherits.setParentClass (Exception, Error);

    return Exception;
});