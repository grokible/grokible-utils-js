'use strict';

var Check = require ('../grokible.check');

var expect = require ('chai').expect;
var TestExpect = require ('../grokible.testExpect');
var Exception = require ('../grokible.exception');

var Exceptions = require ('../grokible.exceptions');
var ArgTypeException = Exceptions.ArgTypeException;
var ArgException = Exceptions.ArgException;
var CheckException = Exceptions.CheckException;

describe ("Check", function () {

    describe ("hasSamePrototype ()", function () {
        it ("should return true if args have same prototype", function () {
            var exc = new Exception ("hello");
            expect (Check.hasSamePrototype (exc, Exception)).to.be.true;
            expect (Check.hasSamePrototype ({}, Object)).to.be.true;
        });

        it ("should throw if args don't have same prototype", function () {
           TestExpect.throws (function () {
               Check.hasSamePrototype ({}, Exception)
           }, CheckException);
        });

        it ("should not throw if throws=false", function () {
            var options = { throws : false };
            expect (Check.hasSamePrototype ({}, Exception, options))
                .to.be.false;

            var exc = new Exception ("hello");
            expect (Check.hasSamePrototype (exc, Exception, options))
                .to.be.true;
        });

        it ("should throw if throws=false, 2nd arg bad", function () {
            var options = { throws : false };

            TestExpect.throws (function () {
                Check.hasSamePrototype ({}, undefined, options);
            }, ArgTypeException);

            TestExpect.throws (function () {
                Check.hasSamePrototype ({}, null, options);
            }, ArgTypeException);

            var obj2 = {};
            obj2.prototype = null;
            TestExpect.throws (function () {
                Check.hasSamePrototype ({}, obj2, options)
            }, ArgTypeException);
 
            obj2.prototype = undefined;
            TestExpect.throws (function () {
                Check.hasSamePrototype ({}, obj2, options)
            }, ArgTypeException);
        });

        it ("should not throw if throws=false, 1st arg is bad", function () {
            var options = { throws : false };
            expect (Check.hasSamePrototype (null, Exception, options))
                .to.be.false;
            expect (Check.hasSamePrototype (undefined, Exception, options))
                .to.be.false;
            expect (Check.hasSamePrototype (1, Exception, options))
                .to.be.false;
            expect (Check.hasSamePrototype ("hello", Exception, options))
                .to.be.false;
            expect (Check.hasSamePrototype ([ ], Exception, options))
                .to.be.false;
            expect (Check.hasSamePrototype ({ }, Exception, options))
                .to.be.false;

            var obj = {};
            obj.prototype = null;
            expect (Check.hasSamePrototype (obj, Exception, options))
                .to.be.false;

            obj.prototype = undefined;
            expect (Check.hasSamePrototype (obj, Exception, options))
                .to.be.false;
        });

        it ("should throw exception type passed in options", function () {
            var options = { exception : ArgException };
            TestExpect.throws (function () {
                Check.hasSamePrototype ({}, Exception, options);
            }, CheckException);
        });
    });

    describe ("isArray ()", function () {
        it ("should return true on Array", function () {
            expect (Check.isArray ([1,2])).to.be.true;
            expect (Check.isArray ([])).to.be.true;
        });

        it ("should throw exception on non-Array", function () {
            TestExpect.throws (function () {
                Check.isArray ("hello")
            }, CheckException, /The value is not an array./);
        });

        it ("should return false on non-Array, throws = false", function () {
            var options = { throws : false };
            expect (Check.isArray ("hello", options)).to.be.false;
            expect (Check.isArray ({}, options)).to.be.false;
            expect (Check.isArray (null, options)).to.be.false;
        });
    });

    describe ("inArray ()", function () {
        it ("should return true if element is in Array", function () {
            expect (Check.inArray (1, [1,2])).to.be.true;
            expect (Check.inArray
                ("hi", ["cruel", "world", "hi"])).to.be.true;
        });

        it ("should throw exception if element not in Array", function () {
            TestExpect.throws (function () {
                Check.inArray ("hello", [1,2]);
            }, CheckException, /The value 'hello' is not in the array./);
        });

        it ("should return false if not in Arr & throws = false",
        function () {
            expect (Check.inArray ("hello", [1,2],
                { throws : false })).to.be.false;
        });
    });

    describe ("isInteger ()", function () {
        it ("should throw exception on non-integer", function () {
            TestExpect.throws (function () {
                Check.isInteger (1.1)
            }, CheckException, /Value '1.1' is not an integer./);
        });

        it ("should throw exception on non-number (e.g. string)",
        function () {
            TestExpect.throws (function () {
                Check.isInteger ("hello")
            }, CheckException, /Value 'hello' is not an integer./);
        });

        it ("should not throw exception on integer", function () {
            Check.isInteger (0);
        });

        it ("should not throw an exception, if optThrows false", function () {
           var options = { throws : false };
           expect (Check.isInteger ("hello", options)).to.equal (false);
           expect (Check.isInteger (1.1, options)).to.equal (false);
           expect (Check.isInteger (undefined, options)).to.equal (false);
           expect (Check.isInteger (null, options)).to.equal (false);
        });
    });

    describe ("isString ()", function () {
        it ("should throw exception on non-string", function () {
            TestExpect.throws (function () {
                Check.isString (1.1)
            }, CheckException, /Value '1.1' is not a string./);
        });

        it ("should not throw exception on string", function () {
            Check.isString ("hello");
        });

        it ("should not throw an exception, if optThrows false", function () {
           var options = { throws : false };
           expect (Check.isString (1, options)).to.equal (false);
           expect (Check.isString (undefined, options)).to.equal (false);
           expect (Check.isString (null, options)).to.equal (false);
        });
    });


    describe ("isNumber ()", function () {
        it ("should throw exception on non-number", function () {
            TestExpect.throws (function () {
                Check.isNumber ("what");
            }, CheckException, /Value 'what' is not a number./);
        });

        it ("should not throw exception on string", function () {
            Check.isNumber (1.1);
            Check.isNumber (1.0);
            Check.isNumber (1);
        });

        it ("should not throw an exception, if optThrows false", function () {
           var options = { throws : false };
           expect (Check.isNumber ("hi", options)).to.equal (false);
           expect (Check.isNumber (NaN, options)).to.equal (false);
           expect (Check.isNumber (undefined, options)).to.equal (false);
           expect (Check.isNumber (null, options)).to.equal (false);
        });
    });

    describe ("isUndefined ()", function () {
        it ("should return true for undefined values", function () {
           var x;
           expect (Check.isUndefined (x)).to.equal (true);
           expect (Check.isUndefined ()).to.equal (true);
        });

        it ("should throw for defined values", function () {
            TestExpect.throws (function () {
                Check.isUndefined (null)
            }, CheckException, /Value 'null' is not undefined./);
        });

        it ("should return false for defined values, throws = false",
        function () {
            expect (Check.isUndefined (null, { throws : false })).to.be.false;
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

    describe ("twoArgTruth", function () {
        // just leave arg2 empty
        var isBool = function (v) {
            if ( ! ((typeof v) === "boolean"))
                throw new CheckException ("Value is not a boolean.");
        };

        it ("should return true on true truth function", function () {
            expect (Check.twoArgTruth (true, undefined, isBool)).to.be.true;
        });
 
        it ("should throw on failure of truth function", function () {
            TestExpect.throws (function () {
                Check.twoArgTruth (1, undefined, isBool)
            }, CheckException);
        });

        it ("should not throw if options.throws = false", function () {
            var options = { throws : false };
            expect (Check.twoArgTruth (1, undefined, isBool,
                options)).to.be.false
        });

        it ("should throw options.exception type", function () {
            TestExpect.throws (function () {
                Check.twoArgTruth (1, undefined, isBool,
                    { exception : Exception })
            }, Exception);
        });

        it ("should throw ArgTypeException if options not map", function () {
            TestExpect.throws (function () {
                Check.twoArgTruth (true, undefined, isBool, 1);
            }, ArgTypeException,
            /Fourth arg .options. must be a map.  It is a number./);
        });
    });

    describe ("keysInArray", function () {
        it ("should return true if key is in array", function () {
            var obj = { hello : 'world' }
            expect (Check.keysInArray (obj, ['hi', 'hello'])).to.be.true;
        });

        it ("should throw an exception if key is not in array", function () {
            var obj = { hello : 'world' }
            TestExpect.throws (function () {
                Check.keysInArray (obj, ['hi', 'bye']);
            }, CheckException, /Key 'hello' not found in array/);
        });
    });


});
