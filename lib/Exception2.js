// Exception2.js - OOP lib, new-less constructor


    /**
     * An Exception object that inherits from Error.  Note we use superCreate ()
     * which will allow the ctor to be called without 'new'
     */

    var Exception2 = function Exception2 () {
        var obj = Inherits.superCreateNewIgnored (Exception2, Error, arguments);
        obj.name = obj.constructor.name;    // Set error class 'name' property
        return obj;
    };

    Inherits.setParentClass (Exception2, Error);

    module.exports = Exception2;
