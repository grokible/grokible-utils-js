
var requirejs = require ('requirejs');
var expect = require ('chai').expect;
var assert = require ('chai').assert;

var baseUrl = process.cwd () + "/lib";

requirejs.config ({
    nodeRequire: require,
    baseUrl : baseUrl,
    paths : {
        CheckException : 'CheckException',
        ProgrammingError : 'ProgrammingError',
        Check : 'Check',
        Exception : 'Exception',
        ArgException : 'ArgException'
    }
});

var Check = requirejs ('Check');
var CheckException = requirejs ('CheckException');
var ProgrammingError = requirejs ('ProgrammingError');

var Exception = requirejs ('Exception');
var ArgException = requirejs ('ArgException');


describe ("Check library", function () {

    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should not throw exc if args have same prototype", function () {
            var exc = new Exception ("hello");

            Check.hasSamePrototype (exc, Exception);
            Check.hasSamePrototype ({}, Object);
        });
    });

    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should throw exc if obj does not have same prototype", function () {
            var exc = new Exception ("hello");
            var thrown = false;
            try {
                Check.hasSamePrototype ({}, Exception);
            } catch (e) {
                thrown = true;
                expect (e).instanceOf (CheckException);
            }
            assert (thrown, "Exception was not thrown");
        });
    });


    describe ("hasSamePrototype (obj, obj2)", function () {
        it ("should throw exc of type optExceptionConstructor if obj does not have same prototype", function () {
            var exc = new Exception ("hello");
            var thrown = false;
            try {
                Check.hasSamePrototype ({}, Exception, ArgException);
            } catch (e) {
                thrown = true;
                expect (e).instanceOf (ArgException);
            }
            assert (thrown, "Exception was not thrown");
        });
    });


});

