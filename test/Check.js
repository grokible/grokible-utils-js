'use strict';

var Check = require ('Check');

var expect = require ('chai').expect;
var TestExpect = require ('TestExpect');
var Exception = require ('Exception');
var ArgTypeException = require ('ArgTypeException');
var ArgException = require ('ArgException');
var CheckException = require ('CheckException');

describe ("Check (lib)", function () {

    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should not throw exc if args have same prototype", function () {
            var exc = new Exception ("hello");

            Check.hasSamePrototype (exc, Exception);
            Check.hasSamePrototype ({}, Object);
        });
    });

    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should throw exc if does not have same prototype", function () {
           TestExpect.throws (function () { Check.hasSamePrototype
               ({}, Exception) }, CheckException);
        });
    });

    describe ("hasSamePrototype (obj, obj2, optThrows=false)", function () {
        it ("should not throw if optThrows=false", function () {
            expect (Check.hasSamePrototype ({}, Exception,
               false)).to.equal (false);

            var exc = new Exception ("hello");
            expect (Check.hasSamePrototype (exc, Exception, false))
                .to.equal (true);
        });
    });

    describe ("hasSamePrototype (obj, <badval>, optThrows=false)",
    function () {
        it ("should throw if optThrows=false, if second " + 
            "arg bad (programming error)", function () {

            TestExpect.throws (function () { Check.hasSamePrototype
                ({}, undefined, false) }, ArgTypeException);

            TestExpect.throws (function () { Check.hasSamePrototype
                ({}, null, false) }, ArgTypeException);

            var obj2 = {};
            obj2.prototype = null;
            TestExpect.throws (function () { Check.hasSamePrototype
                ({}, obj2, false) }, ArgTypeException);
 
            obj2.prototype = undefined;
            TestExpect.throws (function () { Check.hasSamePrototype
                ({}, obj2, false) }, ArgTypeException);
        });
    });

    describe ("hasSamePrototype (<badval>, obj2, optThrows=false)",
    function () {
        it ("should never throw if optThrows=false, even if first arg is bad",
        function () {

            expect (Check.hasSamePrototype
                (null, Exception, false)).to.equal (false);

            expect (Check.hasSamePrototype
                (undefined, Exception, false)).to.equal (false);
            expect (Check.hasSamePrototype (1, Exception, false)).to.equal
                (false);
            expect (Check.hasSamePrototype
                ("hello", Exception, false)).to.equal (false);
            expect (Check.hasSamePrototype ([ ], Exception, false)).to.equal
                (false);
            expect (Check.hasSamePrototype ({ }, Exception, false)).to.equal
                (false);

            var obj = {};
            obj.prototype = null;
            expect (Check.hasSamePrototype (obj, Exception, false)).to.equal
                (false);

            obj.prototype = undefined;
            expect (Check.hasSamePrototype (obj, Exception, false)).to.equal
                (false);
        });
    });

    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should throw exc of type optExceptionCtor if obj does "
            + "not have same prototype", function () {

            TestExpect.throws (function () {
                Check.hasSamePrototype ({}, Exception, true, ArgException)
            }, CheckException);

        });
    });

    describe ("isInteger", function () {
        it ("should throw exception on non-integer", function () {

           TestExpect.throws (function () {
               Check.isInteger (1.1)
           }, CheckException);

        });
    });

    describe ("isInteger", function () {
        it ("should throw exception on non-number (e.g. string)", function () {

           TestExpect.throws (function () {
               Check.isInteger ("hello")
           }, CheckException);

        });
    });

    describe ("isInteger", function () {
        it ("should not throw exception on integer", function () {
            Check.isInteger (0);
        });
    });

    describe ("isInteger (v, optThrows = false)", function () {
        it ("should never throw an exception", function () {
           expect (Check.isInteger ("hello", false)).to.equal (false);
           expect (Check.isInteger (1.1, false)).to.equal (false);
           expect (Check.isInteger (undefined, false)).to.equal (false);
           expect (Check.isInteger (null, false)).to.equal (false);
        });
    });


    describe ("isUndefined (v)", function () {
        it ("should return true for undefined, else throw", function () {
           var x;
           expect (Check.isUndefined (x)).to.equal (true);
           expect (Check.isUndefined ()).to.equal (true);
           TestExpect.throws (function () { Check.isUndefined (null) },
               CheckException);
        });
    });


    describe ("hasClassOfObject ({})", function () {
        it ("should return true", function () {
           expect (Check.hasClassOfObject ({})).to.equal (true);
        });
    });


    describe ("hasClassOfObject (Exception)", function () {
        it ("should throw CheckException", function () {
           var exc = new Exception ("hello");
           TestExpect.throws (function () { Check.hasClassOfObject (exc) },
               CheckException);
        });
    });

    describe ("instanceOf (<something that isA Error>, Error)", function () {
        it ("should be ok", function () {
           expect (Check.instanceOf (new Exception ("hello"), Error)).to.equal
               (true);
           expect (Check.instanceOf
               (new CheckException ("hello"), Error)).to.equal (true);
           expect (Check.instanceOf (new Error ("boo"), Error)).to.equal
               (true);
        });
    });

    describe ("instanceOf (<edge cases>, Object)", function () {
        it ("should be ok", function () {
           expect (Check.instanceOf ({}, Object)).to.equal (true);
           expect (Check.instanceOf ([], Object)).to.equal (true);
        });
    });

    describe ("instanceOf (<not an Exception), Exception)", function () {
        it ("should throw", function () {

           TestExpect.throws (function () {
               Check.instanceOf (new Error (), Exception)
           }, CheckException);

           // Set returned exc type from default (CheckException) to Exception

           TestExpect.throws (function () {
               Check.instanceOf (new Error (), Exception, Exception)
           }, Exception);

        });
    });

    describe ("instanceOf (<not an Object), Object)", function () {
        it ("should throw", function () {

           TestExpect.throws (function () {
               Check.instanceOf (1.0, Object)
           }, CheckException);

           TestExpect.throws (function () {
               Check.instanceOf (undefined, Object)
           }, CheckException);

           // N.B. how we are different here than vanilla Javascript
           // expectations as null is an Object in Javascript.

           TestExpect.throws (function () {
               Check.instanceOf (null, Object)
           }, CheckException);
        });
    });

    describe ("instanceOf (<something>, <bad edge case>)", function () {
        it ("should throw ArgTypeException", function () {

            TestExpect.throws (function () {
                Check.instanceOf (new Error (), {})
            }, ArgTypeException);

            TestExpect.throws (function () {
                Check.instanceOf (new Error (), 1)
            }, ArgTypeException);
        });
    });
});
