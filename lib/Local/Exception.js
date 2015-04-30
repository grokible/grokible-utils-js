'use strict';

// Exception.js - OOP lib, new-less constructor

var Inherits = require ('Local/Inherits');

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

module.exports = Exception;
