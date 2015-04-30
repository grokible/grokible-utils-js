'use strict';

var expect = require ('chai').expect;
var assert = require ('chai').assert;

var TestExpect = {};

/**
 * Test to make sure inheritance code in ctors is setup properly, and all
 *  properties are set to correct values.  Uses chai.expect statements.
 */
TestExpect.inherits = function (obj, constructor, parentCtor, optProperties) {
    expect (obj).instanceOf (parentCtor);
    expect (obj).instanceOf (constructor);
    expect (Object.getPrototypeOf (obj)).to.equal (constructor.prototype);
    expect (obj.constructor).to.equal (constructor);

    // Check passed in properties for equality

    if (optProperties) {
        for (var property in optProperties)
            expect (obj [property]).to.equal (optProperties [property]);
    }
}

// TODO - make sure second arg is set
TestExpect.throws = function (func, exceptionType) {
    var thrown = false;
    try {
        func ();
    } catch (e) {
        thrown = true;
        expect (e).instanceOf (exceptionType);
    }
    expect (thrown).to.equal (true);
}

module.exports = TestExpect;
