
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

TestExpect.throws = function (func, exceptionType, optMessageRegex) {
    var thrown = false;
    var exc;
    try {
        func ();
    } catch (e) {
        thrown = true;
        exc = e;
        expect (e).instanceOf (exceptionType);
    }

    assert (thrown, "Tested function expected to throw exception but didn't.");
    if (optMessageRegex) {
        var msg = "" + exc;
        assert (optMessageRegex.test (msg), "Failed to match EXCEPTION " +
            "MESSAGE=>'" + msg + "' to EXPECTED TEST REGEX=>'" +
            optMessageRegex + "'.");
    }
}

module.exports = TestExpect;
