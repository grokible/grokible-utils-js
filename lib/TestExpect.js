// TestExpect.js

define (['chai'], function (chai) {
        
    var expect = require ('chai').expect;
    var assert = require ('chai').assert;

    var TestExpect = {};

    /**
     * Test to make sure inheritance code in constructors is setup properly, and all
     *  properties are set to correct values.  Uses chai.expect statements.
     */
    TestExpect.inherits = function (obj, constructor, parentConstructor, optProperties) {
        expect (obj).instanceOf (parentConstructor);
        expect (obj).instanceOf (constructor);
        expect (Object.getPrototypeOf (obj)).to.equal (constructor.prototype);
        expect (obj.constructor).to.equal (constructor);

        // Check passed in properties for equality

        if (optProperties) {
            for (var property in optProperties)
                expect (obj [property]).to.equal (optProperties [property]);
        }
    }

    return TestExpect;
});